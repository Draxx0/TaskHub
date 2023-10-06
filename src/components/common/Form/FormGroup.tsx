import { InputType } from "../../../utils/types/input";
import Input from "./Input";

type Props = {
  labelText: string;
  inputName: string;
  inputType: InputType;
  inputPlaceholder: string;
  inputDescription?: string;
  inputDefaultValue?: string;
};

const FormGroup = ({
  labelText,
  inputName,
  inputType,
  inputPlaceholder,
  inputDescription,
  inputDefaultValue,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputName}>{labelText}</label>
      <Input
        name={inputName}
        id={inputName}
        type={inputType}
        placeholder={inputPlaceholder}
        defaultValue={inputDefaultValue}
      />
      {inputDescription && <small className="opacity-75">{inputDescription}</small>}
    </div>
  );
};

export default FormGroup;
