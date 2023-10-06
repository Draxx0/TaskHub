import { FormObject } from "@/utils/types/form";
import FormGroup from "./FormGroup";
import { Button as ButtonShad } from "@/components/ui/button";
import { TFunction } from "i18next";

type Props = {
 formObject: FormObject;
 onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
 t: TFunction<"settings", undefined>;
}

const SettingsForm = ({ formObject, onSubmitEvent, t }: Props) => {
 return (
  <div className="flex flex-col gap-6">
   <form onSubmit={onSubmitEvent} className="space-y-4">
    {formObject.formData.map((object, index) => (
     <FormGroup
      key={index}
      inputName={object.inputName}
      inputPlaceholder={object.inputPlaceholder || ""}
      inputType={object.inputType}
      labelText={object.labelText}
      inputDescription={object.inputDescription}
      inputDefaultValue={object.inputDefaultValue || ""}
     />
    ))}

    <ButtonShad variant={"outline"} type="submit">
     {t("utils.update_button")}
    </ButtonShad>
   </form>
  </div>
 );
}

export default SettingsForm;