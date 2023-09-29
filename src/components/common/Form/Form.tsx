import Button from "../Button";
import FormGroup from "./FormGroup";
import { FormObject } from "./FormSchema";

type Props = {
  formObject: FormObject;
  onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ formObject, onSubmitEvent }: Props) => {
  return (
    <form onSubmit={onSubmitEvent}>
      {formObject.formData.map((object, index) => (
        <FormGroup
          key={index}
          inputName={object.inputName}
          inputPlaceholder={object.inputPlaceholder || ""}
          inputType={object.inputType}
          labelText={object.labelText}
        />
      ))}
      <div className="bg-blue-500">
        <Button text="submit" type="submit" />
      </div>
    </form>
  );
};

export default Form;
