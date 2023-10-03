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
import { Button as ButtonShad } from "@/components/ui/button";

const Auth = ({ type }: { type: "signin" | "login" }) => {
  const { insertUser } = useUserStore();
  const { t } = useTranslation(["auth", "global"]);

  const formObject: FormObject = {
    formName: "Auth form",
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
              {t("authCard.testimonialComment")}
            </p>
            <span className="text-white font-semibold">
              {t("authCard.testimonialAuthor")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full lg:w-1/2 relative">
        <div className="max-w-md m-auto">
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
            isLogin={isLoginPage}
          />
          <ToastContainer />
        </div>

        {isLoginPage() ? (
          <Link className="text-center" to="/auth/signin">
            <ButtonShad
              variant={"ghost"}
              className="lg:absolute right-14 top-10"
            >
              {t("page.signinCtaText")}
            </ButtonShad>
          </Link>
        ) : (
          <Link className="text-center" to="/auth/login">
            <ButtonShad
              variant={"ghost"}
              className="lg:absolute right-14 top-10"
            >
              {t("page.loginCtaText")}
            </ButtonShad>
          </Link>
        )}

        <Link className="text-center" to="/">
          <ButtonShad
            asChild
            variant={"ghost"}
            className=" lg:absolute left-10 bottom-5"
          >
            <div className="flex items-center gap-3">
              <img src="../assets/icons/back.svg" alt="" className="w-5" />
              <p>{t("global:back")}</p>
            </div>
          </ButtonShad>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
