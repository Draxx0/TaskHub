import { settingsSchemas } from "@/components/common/form/FormSchema";
import SettingsForm from "@/components/common/form/SettingsForm";
import TabHeader from "@/components/settings/TabHeader";
import { useToast } from "@/components/ui/use-toast";
import { firebaseUpdate } from "@/service/firebaseUpdate";
import { useUserStore } from "@/store/user.store";
import { updateUserProfile } from "@/service/auth/updateUserProfile";
import { FormObject } from "@/utils/types/form";
import { useTranslation } from "react-i18next";

const Profile = () => {
 const { user, insertUser } = useUserStore();
 const { t } = useTranslation(["settings", "global"]);
 const { toast } = useToast();


 const formObject: FormObject = {
  formName: "Profile form",
  formData: [
   {
    labelText: t("profile.username.username_label"),
    inputName: "username",
    inputPlaceholder: t("profile.username.input_placeholder"),
    inputType: "text",
    inputDescription: t("profile.username.username_description"),
    inputDefaultValue: user?.displayName || ""
   },
  ],
 };

 const formValidation = (username: string): boolean => {
  if (username) {
   settingsSchemas.profileFormSchema.parse({ username })
   return true
  }
  return false
 }

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const username = String(form.get("username"))

  const isFormvalid = formValidation(username)

  if (!isFormvalid) {
   toast({
    title: t("global:errors.global_title"),
    description: t(`global:errors.global_description`),
    variant: "destructive",
   })
   throw new Error("Form is invalid");
  }

  try {
   const updatedUser = await updateUserProfile({
    params: {
     displayName: username
    }
   })
   await firebaseUpdate.docInCollection({
    collection: "users",
    docId: updatedUser.uid,
    updateData: {
     displayName: username
    }
   })

   insertUser(updatedUser);

   toast({
    title: t("utils.profile_update.profile_update_title"),
    description: t("utils.profile_update.profile_update_description"),
   })
  } catch (error) {
   toast({
    title: t("global:errors.global_title"),
    description: t("global:errors.global_description"),
    variant: "destructive"
   })
  }
 }

 return (
  <div className="space-y-10">
   <TabHeader tabTitle={t("profile.title")} tabDescription={t("profile.description")} />
   <SettingsForm onSubmitEvent={handleSubmit} formObject={formObject} t={t} />
  </div>
 );
}

export default Profile;