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
    <div>
      {isLoginPage() ? (
        <p>{t("page.loginPage")}</p>
      ) : (
        <p>{t("page.signinPage")}</p>
      )}
      <Form formObject={formObject} onSubmitEvent={handleSubmit} />
      {isLoginPage() ? (
        <Link to="/auth/signup">{t("page.signinCtaText")}</Link>
      ) : (
        <Link to="/auth/login">{t("page.loginCtaText")}</Link>
      )}
      <ToastContainer />
    </div>
  );
};

export default Auth;
