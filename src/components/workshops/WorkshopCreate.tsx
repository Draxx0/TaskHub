import Modal from "../common/Modal";
import { useToast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";
import { firebaseCreate } from "@/service/firebaseCreate";
import { FormObject } from "@/utils/types/form";
import { queryClient } from "@/main";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/service/firebase.config";
import { convertToBlob } from "@/service/utils/convertToBlob";
import { uploadImageInBucket } from "@/service/storage/uploadInBucket";
import { WorkshopCreate as IWorkshopCreate } from "@/utils/types/workshop";
import { FirestoreUser } from "@/utils/types/user";
import { FirebaseDocData } from "@/utils/types/firebase";
import { firebaseGet } from "@/service/firebaseGet";
import { workshopSchemas } from "../common/form/FormSchema";

const WorkshopCreate = () => {
  const { toast } = useToast();
  const { t } = useTranslation(["workshops", "global"]);

  const formObject: FormObject = {
    formName: "workshop-create-form",
    formData: [
      {
        inputName: "workshop-name",
        inputPlaceholder: t("create.workshop_title_placeholder"),
        inputType: "text",
        labelText: t("create.workshop_title"),
      },
      {
        inputName: "workshop-description",
        inputPlaceholder: t("create.workshop_description_placeholder"),
        inputType: "text",
        labelText: t("create.workshop_description"),
        isTextarea: true,
      },
      {
        inputName: "workshop-background-image",
        inputPlaceholder: "",
        inputType: "file",
        labelText: t("create.workshop_image_background"),
      },
    ],
  };

  const formValidation = (
    workshopTitle: string,
    workshopDescription: string,
    workshopImageBackground: File | null
  ): boolean => {
    try {
      if (workshopTitle && workshopDescription && workshopImageBackground) {
        workshopSchemas.createWorkshopFormSchema.parse({
          workshopTitle,
          workshopDescription,
          workshopImageBackground: workshopImageBackground.name,
        });
      }
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
    const workshopTitle = String(form.get("workshop-name"));
    const workshopDescription = String(form.get("workshop-description"));
    const workshopImageBackground = convertToBlob(
      form.get("workshop-background-image") as File
    );

    const isFormValid = formValidation(
      workshopTitle,
      workshopDescription,
      workshopImageBackground
    );

    if (!isFormValid) {
      throw new Error("Form is invalid");
    }

    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const coverImageUrl = await uploadImageInBucket(
            workshopImageBackground
          );

          const ownerRef = (await firebaseGet.getFirebaseDoc<FirestoreUser>({
            docReferenceParams: {
              path: "users",
              pathSegments: [user.uid],
            },
            returnWithId: true,
          })) as FirebaseDocData<FirestoreUser> | undefined;

          if (coverImageUrl && ownerRef) {
            const newWorkshop = firebaseCreate
              .addDocInCollection<IWorkshopCreate>({
                docReferenceParams: {
                  path: "workshops",
                },
                data: {
                  name: workshopTitle,
                  description: workshopDescription,
                  coverUrl: coverImageUrl,
                  owner: ownerRef,
                },
              })
              .then(() => {
                //! ADD COLLECTION BOARDS IN DOC
              });
          } else {
            throw new Error("Owner reference not found..");
          }

          await queryClient.invalidateQueries({
            queryKey: ["collection", "workshops"],
            exact: true,
          });

          toast({
            title: t("toast.success.title"),
            description: t("toast.success.description"),
          });
        } else {
          throw new Error("User not connected");
        }
      });
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
    }
  };

  return (
    <Modal
      onSubmitEvent={handleSubmit}
      formData={formObject}
      dynamicTranslation={{
        buttonText: t("create.title"),
        description: t("create.description"),
        title: t("create.title"),
      }}
    />
  );
};

export default WorkshopCreate;
