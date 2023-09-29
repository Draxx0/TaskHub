import { InputType } from "../../../utils/types/input";
import Input from "./Input";

type Props = {
  labelText: string;
  inputName: string;
  inputType: InputType;
  inputPlaceholder: string;
};

const FormGroup = ({
  labelText,
  inputName,
  inputType,
  inputPlaceholder,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputName}>{labelText}</label>
      <Input
        name={inputName}
        id={inputName}
        type={inputType}
        placeholder={inputPlaceholder ?? ""}
      />
    </div>
  );
};

export default FormGroup;
