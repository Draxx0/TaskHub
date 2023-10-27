import SettingsForm from "@/components/common/form/SettingsForm";
import TabHeader from "@/components/common/settings/TabHeader";
import { useToast } from "@/components/ui/use-toast";
import { firebaseUpdate } from "@/service/firestore/firebaseUpdate";
import { useUserStore } from "@/store/user.store";
import { updateUserProfile } from "@/service/auth/updateUserProfile";
import { FormObject } from "@/utils/types/form";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowBigRight, Pen } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { uploadImageInBucket } from "@/service/storage/uploadInBucket";

const Profile = () => {
  const { user, insertUser } = useUserStore();
  const { t } = useTranslation(["settings", "global"]);
  const { toast } = useToast();
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const [uploadedNewPictureUrl, setUploadedNewPictureUrl] = useState<
    string | null
  >(null);

  const formObject: FormObject = {
    formName: "Profile form",
    formData: [
      {
        labelText: t("profile.username.username_label"),
        inputName: "username",
        inputPlaceholder: t("profile.username.input_placeholder"),
        inputType: "text",
        inputDescription: t("profile.username.username_description"),
        inputDefaultValue: user?.displayName || "",
      },
    ],
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username"));

    try {
      if (user) {
        const updatedUser = await updateUserProfile({
          params: {
            displayName: username || user.displayName || undefined,
            photoURL: uploadedNewPictureUrl || user.photoURL || undefined,
          },
        });

        await firebaseUpdate.docInCollection<{
          displayName?: string;
          photoUrl?: string;
        }>({
          collection: "users",
          docId: updatedUser.uid,
          updateData: {
            displayName: username || user.displayName || undefined,
            photoUrl: uploadedNewPictureUrl || user.photoURL || undefined,
          },
        });

        setProfilePictureFile(null);
        setUploadedNewPictureUrl(null);

        insertUser(updatedUser);
      }

      toast({
        title: t("utils.profile_update.profile_update_title"),
        description: t("utils.profile_update.profile_update_description"),
      });
    } catch (error) {
      console.log("catch here");
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePictureFile(file);
    }
  };

  const uploadNewProfilePicture = useCallback(async () => {
    const url = await uploadImageInBucket(profilePictureFile);
    if (url) {
      setUploadedNewPictureUrl(url);
    }
  }, [profilePictureFile]);

  useEffect(() => {
    if (profilePictureFile) {
      uploadNewProfilePicture();
    }
  }, [uploadNewProfilePicture, profilePictureFile]);

  return (
    <div className="space-y-10">
      <TabHeader
        tabTitle={t("profile.title")}
        tabDescription={t("profile.description")}
      />
      <SettingsForm onSubmitEvent={handleSubmit} formObject={formObject} t={t}>
        <>
          {user && user.photoURL && (
            <div className="flex flex-col gap-2">
              <label htmlFor="profile-picture">Photo de profil</label>
              <div className="flex items-center gap-3">
                <div className="relative cursor-pointer group w-fit">
                  <Avatar className="group-hover:opacity-50 cursor-pointer relative z-10 transition ease-in-out duration-300">
                    <>
                      <Pen className="opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <AvatarImage
                        src={user.photoURL}
                        className={"w-16 h-16 object-cover rounded-full"}
                      />
                      <AvatarFallback>
                        <img
                          src="./assets/icons/fallback.png"
                          alt=""
                          className={"w-16 h-16 object-cover rounded-full"}
                        />
                      </AvatarFallback>
                    </>
                  </Avatar>
                  <Input
                    name="profile-picture"
                    className="cursor-pointer absolute inset-0 z-30 w-full h-full opacity-0"
                    type="file"
                    onChange={handleFileInputChange}
                  />
                </div>
                {uploadedNewPictureUrl && (
                  <>
                    <ArrowBigRight />
                    <Avatar>
                      <AvatarImage
                        src={uploadedNewPictureUrl}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </Avatar>
                  </>
                )}
              </div>
              <small className="opacity-75">votre photo de profil</small>
            </div>
          )}
        </>
      </SettingsForm>
    </div>
  );
};

export default Profile;
