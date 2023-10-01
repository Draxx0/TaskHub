import { createPortal } from "react-dom";

const Loader = () => {
  return createPortal(<p>I'm loader</p>, document.body);
};

export default Loader;
