import { createPortal } from "react-dom";

const Loader = () => {
  return createPortal(<>I'm loader</>, document.body);
};

export default Loader;
