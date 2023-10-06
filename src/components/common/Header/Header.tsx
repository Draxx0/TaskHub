import { Link } from "react-router-dom";
import NavigationList from "./NavigationList";

const Header = () => {
  return (
    <nav className="w-[13%] h-screen fixed left-0 border-r bg-main-gray border-gray-200/75">

      <div className="flex flex-col py-4 px-6">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <Link to="/" className="cursor-pointer">
              <img src="../assets/images/logo.svg" alt="" />
            </Link>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="currentColor"
              className="-rotate-90 cursor-pointer transition-transform ease-in-out duration-300 hover:-translate-x-1 hover:text-main-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.49994 5.66675C8.2166 5.66675 7.93327 5.80841 7.7916 5.95008L3.1166 10.6251C2.6916 11.0501 2.6916 11.7584 3.1166 12.1834C3.5416 12.6084 4.24993 12.6084 4.67493 12.1834L8.49994 8.35841L12.3249 12.1834C12.7499 12.6084 13.4583 12.6084 13.8833 12.1834C14.3083 11.7584 14.3083 11.0501 13.8833 10.6251L9.34994 6.09175C9.0666 5.80841 8.78327 5.66675 8.49994 5.66675Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <NavigationList />
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
