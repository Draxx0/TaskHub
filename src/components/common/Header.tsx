import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="w-[13%] h-screen fixed left-0 border-r bg-gray-100/10 border-gray-200/75">
      <div className="flex flex-col justify-between h-full r py-6 px-8">
        <div className="flex justify-between items-center">
          <span>TaskHub</span>
          <span>{"<"}</span>
        </div>

        <ul>
          <li>
            <Link to="/workshops">Workshops</Link>
          </li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </div>

      {/* 
      <div>
        INVITE TEAMMATES BUTTON DISPLAY ONLY WHEN ON /WORKSHOPS/ID/BOARDS/ID
      </div> */}
    </nav>
  );
};

export default Header;
