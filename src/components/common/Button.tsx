import { Link } from "react-router-dom";

type Props = {
  text: string;
  type?: "submit" | "button";
  url?: string;
  onClickEvent?: () => void;
};

const Button = ({ text, type = "button", url, onClickEvent }: Props) => {
  return (
    <button type={type} onClick={onClickEvent ?? undefined}>
      {url ? <Link to={url}>{text}</Link> : text}
    </button>
  );
};

export default Button;
