import { useUserStore } from "../../store/user.store";
import { Link } from "react-router-dom";
import Form from "../../components/common/Form/Form";
import { useTranslation } from "react-i18next";
import { FormObject } from "../../utils/types/form";
import { authFormSchema } from "../../components/common/Form/FormSchema";
import { ToastContainer, toast } from "react-toastify";
import { ZodError } from "zod";
import { authFormErrorFinder } from "../../utils/functions/authFormErrorTranslation";
import authService from "../../utils/services/authService";

const Auth = ({ type }: { type: "signup" | "login" }) => {
  const { insertUser } = useUserStore();
  const { t } = useTranslation(["auth"]);

  const formObject: FormObject = {
    formName: "my form",
    formData: [
      {
        labelText: t("email.emailLabel"),
        inputName: "email",
        inputPlaceholder: t("email.inputPlaceholder"),
        inputType: "email",
      },
      {
        labelText: t("password.passwordLabel"),
        inputName: "password",
        inputPlaceholder: t("password.inputPlaceholder"),
        inputType: "password",
      },
    ],
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const type = isLoginPage() ? "login" : "signup";
    // FORM VALIDATION
    try {
      authFormSchema.parse({ email, password });
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((e) => {
          const errorType = authFormErrorFinder(e.message);
          if (!errorType.error) {
            return;
          }
          toast.error(t(`formError.${errorType.error}`));
        });
      }
    }
    // AUTH
    try {
      const response = await authService.authenticate(type, {
        email: String(email),
        password: String(password),
      });
      insertUser(response.user);
    } catch (error) {
      toast.error(t("formError.default"));
    }
  };

  const isLoginPage = (): boolean => {
    return type === "login";
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-5 w-1/2">
        <div className="max-w-xl m-auto">
          {isLoginPage() ? (
            <h2 className="text-xl font-semibold">{t("page.loginPage")}</h2>
          ) : (
            <h2 className="text-xl font-semibold">{t("page.signinPage")}</h2>
          )}
          <Form
            formObject={formObject}
            onSubmitEvent={handleSubmit}
            cardData={{
              title: isLoginPage()
                ? t("authCard.loginTitle")
                : t("authCard.signinTitle"),
              description: isLoginPage()
                ? t("authCard.loginDescription")
                : t("authCard.signinDescription"),
            }}
          />
          {isLoginPage() ? (
            <Link to="/auth/signup">{t("page.signinCtaText")}</Link>
          ) : (
            <Link to="/auth/login">{t("page.loginCtaText")}</Link>
          )}
          <ToastContainer />
        </div>
      </div>
      <div className="w-1/2 h-screen bg-cover bg-[url('/assets/images/auth2.jpg')] relative">
        <div className="bg-black/40 absolute h-full w-full inset-0"></div>
        <div className="flex flex-col gap-3 absolute bottom-10 left-10">
          <span className="text-3xl text-white">
            {t("authCard.testimonialAuthor")}
          </span>
          <p className=" text-white  font-bold">
            {t("authCard.testimonialComment")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
