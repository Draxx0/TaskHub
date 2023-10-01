import { InputType } from "./input";

export interface FormObject {
  formName: string;
  formData: {
    labelText: string;
    inputName: string;
    inputType: InputType;
    inputPlaceholder: string;
  }[];
}
