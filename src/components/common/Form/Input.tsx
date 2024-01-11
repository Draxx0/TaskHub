import { twMerge } from 'tailwind-merge';
import { InputType } from '../../../utils/types/input';

type Props = {
  type: InputType;
  id: string;
  placeholder?: string;
  name: string;
  defaultValue?: string;
  className?: string;
};

const Input = ({
  type,
  id,
  placeholder,
  name,
  defaultValue,
  className,
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={twMerge(
        'border-gray-500/25 outline-main-500 placeholder:text-sm rounded-md border w-full p-2',
        className
      )}
      placeholder={placeholder ?? ''}
      defaultValue={defaultValue ?? ''}
    />
  );
};

export default Input;
