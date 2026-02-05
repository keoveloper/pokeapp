import { useFavoritesStore } from "../../stores/favoritesStore";
import { useFavoritePokemons } from "./services";

export function useFavoritesController() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const { data: pokemons, isLoading, isError, refetchAll } =
    useFavoritePokemons(favorites);

  const isEmpty = favorites.length === 0;

  return {
    pokemons,
    isLoading,
    isError,
    isEmpty,
    refetchAll,
  };
}
