import { FormObject } from "@/utils/types/form";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import DefaultForm from "./form/DefaultForm";
import { useTranslation } from "react-i18next";
import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";

type Props = {
 formData: FormObject
 onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
 dynamicTranslation: {
  title: string;
  description: string;
  buttonText: string;
 }
}

const Modal = ({ formData, onSubmitEvent, dynamicTranslation }: Props) => {
 const { t } = useTranslation(["global"])
 return (
  <AlertDialog>
   <AlertDialogTrigger asChild>
    <Button>{dynamicTranslation.buttonText}</Button>
   </AlertDialogTrigger>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>{dynamicTranslation.title}</AlertDialogTitle>
     <AlertDialogDescription>
      {dynamicTranslation.description}
     </AlertDialogDescription>
    </AlertDialogHeader>
    <DefaultForm onSubmitEvent={onSubmitEvent} formObject={formData} hasSubmitButton={false}>
     <div>
      <AlertDialogFooter className="mt-4">
       <Button asChild variant={"outline"}>
        <AlertDialogCancel>{t("modal.cancel")}</AlertDialogCancel>
       </Button>
       <Button type="submit" asChild>
        <AlertDialogAction>{t("modal.submit")}</AlertDialogAction>
       </Button>
      </AlertDialogFooter>
     </div>
    </DefaultForm>
   </AlertDialogContent>
  </AlertDialog>
 );
}

export default Modal;