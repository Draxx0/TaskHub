import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="w-[13%] h-screen fixed left-0 border-r bg-main-gray border-gray-200/75">
      <div className="flex flex-col justify-between h-full r py-6 px-8">
        <div className="flex justify-between  items-center">
          <Link to="/" className="cursor-pointer">
            <img src="./assets/images/logo.svg" alt="" />
          </Link>
          {/* <span>{"<"}</span> */}
        </div>
        <ul>
          <li>
            <Link to="/workshops">Workshops</Link>
          </li>
          <li>
            <Link to="/">Settings</Link>
          </li>
          <li>Link 3</li>
        </ul>

        <div>
          <span className="font-bold">Favoris</span>
          <ul>
            <li>
              <Link to="/">1</Link>
            </li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>

      {/* 
      <div>
        INVITE TEAMMATES BUTTON DISPLAY ONLY WHEN ON /WORKSHOPS/ID/BOARDS/ID
      </div> */}
    </nav>
  );
};

export default Header;
