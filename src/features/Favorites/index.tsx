import { useFavoritesController } from "./useFavoritesController";
import { FavoritesLayout } from "./Layout";

export default function Favorites() {
  const controller = useFavoritesController();
  return <FavoritesLayout {...controller} />;
}
