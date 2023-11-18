import { Board } from "@/utils/types/board";
import { Link } from "react-router-dom";

const FavoriteItem = ({ favorite }: { favorite: Board }) => {
  return (
    <li className="hover:underline">
      <Link to={`/workshops/${favorite.workshopId}/boardId/${favorite.id}`}>
        {favorite.name}
      </Link>
    </li>
  );
};

export default FavoriteItem;
