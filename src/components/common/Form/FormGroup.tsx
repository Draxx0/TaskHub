import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FormObject } from "@/utils/types/form";

type Props = Omit<FormObject["formData"][number], "formName">;

const FormGroup = ({
  labelText,
  inputName,
  inputType,
  inputPlaceholder,
  inputDescription,
  inputDefaultValue,
  isTextarea = false,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputName}>{labelText}</label>
      {!isTextarea ? <Input
        name={inputName}
        id={inputName}
        type={inputType}
        placeholder={inputPlaceholder}
        defaultValue={inputDefaultValue}
      /> : <Textarea name={inputName} placeholder={inputPlaceholder} defaultValue={inputDefaultValue} minLength={30} />}
      {inputDescription && <small className="opacity-75">{inputDescription}</small>}
    </div>
  );
};

export default FormGroup;
