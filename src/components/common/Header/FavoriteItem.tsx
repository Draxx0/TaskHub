import { Board } from "@/utils/types/board";
import { Circle } from "lucide-react";
import { Link } from "react-router-dom";

const FavoriteItem = ({ favorite }: { favorite: Board }) => {
  return (
    <li className="group flex items-center gap-2">
      <Circle
        size={14}
        className="opacity-50 group-hover:text-main-700 group-hover:opacity-100 transition-all ease-in-out duration-300"
      />
      <Link
        className="opacity-50 group-hover:text-main-700 group-hover:opacity-100 transition-all ease-in-out duration-300"
        to={`/workshops/${favorite.workshopId}/boardId/${favorite.id}`}
      >
        {favorite.name}
      </Link>
    </li>
  );
};

export default FavoriteItem;
