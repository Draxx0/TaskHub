import { Link } from "react-router-dom";
import Form from "../../components/common/Form/Form";
import { FormObject } from "../../components/common/Form/FormSchema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/firebase.config";
import { useUserStore } from "../../store/user.store";

const Signup = () => {
  const { insertUser } = useUserStore();
  const formObject: FormObject = {
    formName: "test2",
    formData: [
      {
        labelText: "Email",
        inputName: "email",
        inputPlaceholder: "Votre email",
        inputType: "email",
      },
      {
        labelText: "Mot de passe",
        inputName: "password",
        inputPlaceholder: "Votre mot de passe",
        inputType: "password",
      },
    ],
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = form.get("password");
    const email = form.get("email");
    console.log("log with pw", password, "email", email);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        String(email),
        String(password)
      );
      console.log("RESPONSE", response);
      insertUser(response.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>Signup Page</p>
      <Form
        formObject={formObject}
        onChangeEvent={() => ""}
        onSubmitEvent={handleSubmit}
      />
      <Link to="/auth/login">Se connecter</Link>
    </div>
  );
};

export default Signup;
