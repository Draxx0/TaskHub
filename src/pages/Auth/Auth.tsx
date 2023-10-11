import { useUserStore } from "../../store/user.store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormObject } from "../../utils/types/form";
import { authSchemas } from "../../components/common/form/FormSchema";
import { ZodError } from "zod";
import { authFormErrorFinder } from "../../utils/functions/authFormErrorTranslation";
import authService from "../../utils/services/authService";
import { Button as ButtonShad } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthForm from "../../components/common/form/AuthForm";
import Back from "@/components/common/Back";

const Auth = ({ type }: { type: "signin" | "login" }) => {
  const { insertUser } = useUserStore();
  const { t } = useTranslation(["auth", "global"]);
  const { toast } = useToast();

  const formObject: FormObject = {
    formName: "Auth form",
    formData: [
      {
        labelText: t("auth_card.email.email_label"),
        inputName: "email",
        inputPlaceholder: t("auth_card.email.input_placeholder"),
        inputType: "email",
      },
      {
        labelText: t("auth_card.password.password_label"),
        inputName: "password",
        inputPlaceholder: t("auth_card.password.input_placeholder"),
        inputType: "password",
      },
    ],
  };

  const formValidation = (email: string, password: string, profile?: string): boolean => {
    const isLogin = !profile;
    try {
      if (isLogin) {
        authSchemas.authLoginFormSchema.parse({ email, password });
      } else {
        authSchemas.authSigninFormSchema.parse({ email, password, profile })
      }
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((e) => {
          const errorType = authFormErrorFinder(e.message);
          if (!errorType.error) {
            return;
          }
          toast({
            title: t("auth:form_error.title"),
            description: t(`auth:form_error.${errorType.error}`)
          })
        });
      }
      return false
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const profile = !isLoginPage() ? String(form.get("profil")) : undefined
    const type = isLoginPage() ? "login" : "signup";
    // FORM VALIDATION
    const isFormvalid = formValidation(email, password, profile)
    if (!isFormvalid) {
      throw new Error("Form is invalid");
    }

    // AUTH
    try {
      const response = await authService.authenticate(type, {
        email,
        password,
        profile
      });
      insertUser(response.user);
    } catch (error) {
      toast({
        title: t("auth:form_error.title"),
        description: t("auth:form_error.default"),
        variant: "destructive"
      })
      console.log(error)
    }
  };

  const isLoginPage = (): boolean => {
    return type === "login";
  };

  return (
    <div className="lg:flex lg:space-y-0 space-y-10">
      <div className="w-full lg:w-1/2 h-[150px] lg:h-screen group overflow-hidden">
        <div className="h-full relative border-r border-secondary-500">
          <div className="bg-cover bg-center lg:bg- h-full bg-[url('../assets/images/auth.jpg')] group-hover:scale-105 transition ease-in-out duration-1000"></div>
          <div className="bg-black/40 absolute h-full w-full inset-0"></div>
          <img
            src="../assets/images/logo_white.svg"
            alt=""
            className="absolute top-10 left-10 backdrop-blur-2xl bg-gradient-custom px-3 py-2 rounded-xl"
          />
          <div className="hidden lg:flex flex-col gap-3 absolute bottom-10 left-10">
            <p className=" text-white text-lg font-bold">
              {t("auth_card.testimonial_comment")}
            </p>
            <span className="text-white font-semibold">
              {t("auth_card.testimonial_author")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full lg:w-1/2 relative">
        <div className="max-w-xl m-auto">
          <AuthForm
            formObject={formObject}
            onSubmitEvent={handleSubmit}
            cardData={{
              title: isLoginPage()
                ? t("auth_card.login_title")
                : t("auth_card.signin_title"),
              description: isLoginPage()
                ? t("auth_card.login_description")
                : t("auth_card.signin_description"),
            }}
            isLogin={isLoginPage}
          />
        </div>

        {isLoginPage() ? (
          <Link className="text-center" to="/auth/signin">
            <ButtonShad
              variant={"ghost"}
              className="lg:absolute right-10 top-5"
            >
              {t("page.signin_cta_text")}
            </ButtonShad>
          </Link>
        ) : (
          <Link className="text-center" to="/auth/login">
            <ButtonShad
              variant={"ghost"}
              className="lg:absolute right-10 top-5"
            >
              {t("page.login_cta_text")}
            </ButtonShad>
          </Link>
        )}

        <Back url="/" variant="ghost" className="lg:absolute left-10 bottom-5" translate={t("global:back")} />
      </div>
    </div>
  );
};

export default Auth;
