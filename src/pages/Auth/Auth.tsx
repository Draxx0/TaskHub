import { FormObject } from "../../components/common/Form/FormSchema";
import { useUserStore } from "../../store/user.store";
import { Link } from "react-router-dom";
import Form from "../../components/common/Form/Form";
import authService from "../../utils/services/authService";
import { useTranslation } from "react-i18next";

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
    console.log("log with pw", password, "email", email);
    const type = isLoginPage() ? "login" : "signup";
    try {
      const response = await authService.authenticate(type, {
        email: String(email),
        password: String(password),
      });
      console.log("RESPONSE", response);
      insertUser(response.user);
    } catch (error) {
      console.log(error);
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
    </div>
  );
};

export default Auth;
