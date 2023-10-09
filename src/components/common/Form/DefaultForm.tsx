import { FormObject } from "@/utils/types/form";
import { Button } from "@/components/ui/button";
import FormGroup from "./FormGroup";

type Props = {
 formObject: FormObject;
 onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
 hasSubmitButton?: boolean;
 children?: React.ReactElement
}

const DefaultForm = ({ formObject, onSubmitEvent, hasSubmitButton = true, children }: Props) => {
 return (
  <form onSubmit={onSubmitEvent} className="flex flex-col gap-4">
   {formObject.formData.map((props, index) => (
    <FormGroup key={index} {...props} />
   ))}
   {children}
   {hasSubmitButton && (
    <Button type="submit">Submit</Button>
   )}
  </form>
 );
}

export default DefaultForm;