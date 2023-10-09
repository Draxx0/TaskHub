import { FormObject } from "@/utils/types/form";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import DefaultForm from "./form/DefaultForm";
import { useTranslation } from "react-i18next";
import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";

type Props = {
 formData: FormObject
 onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Modal = ({ formData, onSubmitEvent }: Props) => {
 const { t } = useTranslation(["workshops", "global"])
 return (
  <AlertDialog>
   <AlertDialogTrigger asChild>
    <Button>{t("create.title")}</Button>
   </AlertDialogTrigger>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>{t("create.title")}</AlertDialogTitle>
     <AlertDialogDescription>
      {t("create.description")}
     </AlertDialogDescription>
    </AlertDialogHeader>
    <DefaultForm onSubmitEvent={onSubmitEvent} formObject={formData} hasSubmitButton={false}>
     <div>
      <AlertDialogFooter className="mt-4">
       <Button asChild variant={"outline"}>
        <AlertDialogCancel>{t("global:modal.cancel")}</AlertDialogCancel>
       </Button>
       <Button type="submit" asChild>
        <AlertDialogAction>{t("global:modal.continue")}</AlertDialogAction>
       </Button>
      </AlertDialogFooter>
     </div>
    </DefaultForm>
   </AlertDialogContent>
  </AlertDialog>
 );
}

export default Modal;