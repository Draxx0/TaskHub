import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <p className="text-red-400">page not found</p>
      <Link to="/">Go back to home</Link>
    </>
  );
};

export default NotFoundPage;
