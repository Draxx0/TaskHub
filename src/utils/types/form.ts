import { InputType } from "./input";

export interface FormObject {
  formName: string;
  formData: {
    labelText: string;
    inputName: string;
    inputType: InputType;
    inputPlaceholder: string;
    inputDescription?: string;
    inputDefaultValue?: string;
  }[];
}

export interface FormsProps {
  formObject: FormObject;
  onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
  mainData: {
    title: string;
    description: string;
  };
  isLogin: () => boolean;
}
