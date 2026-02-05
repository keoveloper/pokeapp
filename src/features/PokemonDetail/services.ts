import { useQuery } from "@tanstack/react-query";
import { pokemonApi } from "../../services/api";
import type { PokemonDetail } from "../../shared/types/pokemon";

export function usePokemonDetail(name: string) {
  return useQuery<PokemonDetail>({
    queryKey: ["pokemon", name],
    queryFn: () => pokemonApi.getPokemonByName(name),
    enabled: !!name,
  });
}
