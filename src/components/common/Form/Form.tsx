import { FormObject } from "@/utils/types/form";
import { Button as ButtonShad } from "@/components/ui/button";
import FormGroup from "./FormGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  formObject: FormObject;
  onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
  cardData: {
    title: string;
    description: string;
  };
};

const Form = ({ formObject, onSubmitEvent, cardData }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardData.title}</CardTitle>
        <CardDescription>{cardData.description}</CardDescription>
      </CardHeader>
      <CardContent>
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
          <ButtonShad
            variant={"outline"}
            type="submit"
            className="mt-4 flex w-fit"
          >
            Soumettre
          </ButtonShad>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
