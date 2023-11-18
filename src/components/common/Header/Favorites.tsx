import { usePreferencesStore } from "@/store/preferences.store";
import FavoriteItem from "./FavoriteItem";

const Favorites = () => {
  const { favorites } = usePreferencesStore();
  return (
    <ul className="flex flex-col gap-3">
      {favorites.map((favorite) => (
        <FavoriteItem key={favorite.id} favorite={favorite} />
      ))}
    </ul>
  );
};

export default Favorites;
