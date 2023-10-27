import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { authSchemas } from "../../validation/FormSchema";
import { reauthenticateUser } from "@/service/auth/reauthenticateUser";
import { updateUserEmail } from "@/service/auth/updateUserEmail";
import { firebaseUpdate } from "@/service/firestore/firebaseUpdate";
import { useUserStore } from "@/store/user.store";

const ReauthenticateModal = ({
  isOpen,
  setIsOpen,
  newEmail,
  setNewEmail,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  newEmail: string;
  setNewEmail: (value: string | null) => void;
}) => {
  const { toast } = useToast();
  const { t } = useTranslation("global");
  const { insertUser } = useUserStore();

  const formValidation = (email: string, password: string): boolean => {
    try {
      authSchemas.authLoginFormSchema.parse({ email, password });
      return true;
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    if (!formValidation(email, password)) {
      throw new Error("Form is invalid");
    }

    //! FROM HERE NOT WORKING ERROR : "Please verify the new email before changing email."
    const confirmed = window.confirm(
      `Please confirm that you've verified the new email: ${newEmail}`
    );

    if (confirmed) {
      try {
        await reauthenticateUser({
          email,
          password,
        });

        const updatedUser = await updateUserEmail(newEmail);

        await firebaseUpdate.docInCollection({
          collection: "users",
          docId: updatedUser.uid,
          updateData: {
            email: newEmail,
          },
        });

        insertUser(updatedUser);
      } catch (error) {
        console.error("Error reauthenticating or updating email:", error);
        throw new Error("An error occurred");
      }
    }

    setNewEmail(null);
    setIsOpen(false);
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reauthenticate</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-3">
            <label>Email</label>
            <Input placeholder="email" name="email" type="email" />
          </div>

          <div className="flex flex-col gap-3">
            <label>Password</label>
            <Input placeholder="password" name="password" type="password" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type="submit">Login</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReauthenticateModal;
