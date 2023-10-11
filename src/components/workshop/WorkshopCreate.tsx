import Modal from "../common/Modal";
import { workshopSchemas } from "../common/form/FormSchema";
import { useToast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";
import { firebaseCreate } from "@/service/firebaseCreate";
import { useUserStore } from "@/store/user.store";
import { FormObject } from "@/utils/types/form";
import { queryClient } from "@/main";
import { getCurrentUserDoc } from "@/service/functions/getCurrentUserDoc";
import { DocumentReference } from "firebase/firestore";

const WorkshopCreate = () => {
 const { toast } = useToast();
 const { user } = useUserStore();
 const { t } = useTranslation(["workshops", "global"])

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
   //? Select workshop background
  ],
 }

 const formValidation = (workshopTitle: string, workshopDescription: string): boolean => {
  try {
   if (workshopTitle && workshopDescription) {
    workshopSchemas.createWorkshopFormSchema.parse({
     workshopTitle,
     workshopDescription
    })
   }
   return true
  } catch (error) {
   toast({
    title: t("global:errors.global_title"),
    description: t("global:errors.global_description"),
    variant: "destructive"
   })
   return false
  }
 }

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const workshopTitle = String(form.get("workshop-name"));
  const workshopDescription = String(form.get("workshop-description"));

  console.log(workshopTitle, workshopDescription)

  const isFormValid = formValidation(workshopTitle, workshopDescription);

  if (!isFormValid) {
   throw new Error("Form is invalid")
  }

  try {
   if (user) {
    const ownerRef = await getCurrentUserDoc<DocumentReference>(user.uid)

    firebaseCreate.addDocInCollection({
     docReference: {
      path: "workshops"
     },
     data: {
      name: workshopTitle,
      description: workshopDescription,
      owner: ownerRef
     }
    })

    await queryClient.invalidateQueries({
     queryKey: ["collection", "workshops"],
     exact: true,
    })

    toast({
     title: t("toast.success.title"),
     description: t("toast.success.description")
    })
   } else {
    throw new Error("User not found");
   }
  } catch (error) {
   toast({
    title: t("global:errors.global_title"),
    description: t("global:errors.global_description"),
    variant: "destructive"
   })
  }
 }

 return <Modal onSubmitEvent={handleSubmit} formData={formObject} />


}

export default WorkshopCreate;