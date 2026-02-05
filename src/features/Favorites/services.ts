import { useQueries } from "@tanstack/react-query";
import { pokemonApi } from "../../services/api";
import type { PokemonDetail } from "../../shared/types/pokemon";

export function useFavoritePokemons(names: string[]) {
  const results = useQueries({
    queries: names.map((name) => ({
      queryKey: ["pokemon", name],
      queryFn: () => pokemonApi.getPokemonByName(name),
      enabled: !!name,
    })),
  });

  const data: PokemonDetail[] = [];
  let isLoading = false;
  let isError = false;

  for (const result of results) {
    if (result.isLoading) isLoading = true;
    if (result.isError) isError = true;
    if (result.data) data.push(result.data);
  }

  const refetchAll = () => {
    for (const result of results) {
      result.refetch();
    }
  };

  return { data, isLoading, isError, refetchAll };
}
