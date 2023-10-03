import { useTranslation } from "react-i18next";
import { FormObject } from "@/utils/types/form";
import { Button as ButtonShad } from "@/components/ui/button";
import FormGroup from "./FormGroup";
import { Link } from "react-router-dom";

type Props = {
  formObject: FormObject;
  onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
  cardData: {
    title: string;
    description: string;
  };
  isLogin: () => boolean;
};

const Form = ({ formObject, onSubmitEvent, cardData, isLogin }: Props) => {
  const { t } = useTranslation(["auth"]);
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center space-y-3">
        <h1 className=" text-3xl font-bold">{cardData.title}</h1>
        <p className="text-sm">{cardData.description}</p>
      </div>
      <form onSubmit={onSubmitEvent} className="space-y-4">
        {formObject.formData.map((object, index) => (
          <FormGroup
            key={index}
            inputName={object.inputName}
            inputPlaceholder={object.inputPlaceholder || ""}
            inputType={object.inputType}
            labelText={object.labelText}
          />
        ))}
        <ButtonShad variant={"outline"} type="submit" className="w-full">
          {isLogin() ? t("submit_action.login") : t("submit_action.signin")}
        </ButtonShad>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white font-semibold px-2 text-muted-foreground">
            {t("orContinueWith")}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <ButtonShad variant={"outline"} asChild>
          <Link to={"#"} className="flex items-center gap-2 cursor-pointer">
            <img src="../assets/icons/github.svg" alt="" className="w-5" />
            <p>Github</p>
          </Link>
        </ButtonShad>

        <ButtonShad variant={"outline"} asChild>
          <Link to={"#"} className="flex items-center gap-2 cursor-pointer">
            <img src="../assets/icons/google.svg" alt="" className="w-5" />
            <p>Google</p>
          </Link>
        </ButtonShad>
      </div>

      <p className="text-center text-sm opacity-75">
        {t("agreeConditionText")}
      </p>
    </div>
  );
};

export default Form;
