import { InputType } from "../../../utils/types/input";

type Props = {
  type: InputType;
  id: string;
  placeholder?: string;
  name: string;
};

const Input = ({ type, id, placeholder, name }: Props) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className="border-gray-500/25 outline-main-500 placeholder:text-sm rounded-md border w-full p-2"
      placeholder={placeholder ?? ""}
    />
  );
};

export default Input;
