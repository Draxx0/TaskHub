import { InputType } from "../../../utils/types/input";

type Props = {
  type: InputType;
  id: string;
  placeholder?: string;
  name: string;
};

const Input = ({ type, id, placeholder, name }: Props) => {
  return (
    <input type={type} name={name} id={id} placeholder={placeholder ?? ""} />
  );
};

export default Input;
