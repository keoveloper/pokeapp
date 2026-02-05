import { useParams, useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { usePokemonDetail } from "./services";

export function usePokemonDetailController() {
  const { name = "" } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, isError, refetch } = usePokemonDetail(name);

  const isFavorite = useFavoritesStore((s) => s.isFavorite(name));
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(name);
    } else {
      addFavorite(name);
    }
  };

  const goBack = () => navigate(-1);

  return {
    pokemon,
    isLoading,
    isError,
    refetch,
    isFavorite,
    toggleFavorite,
    goBack,
  };
}
