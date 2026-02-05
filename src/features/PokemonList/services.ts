import { useQuery, useQueries } from "@tanstack/react-query";
import { pokemonApi } from "../../services/api";
import type {
  PokemonListResponse,
  PokemonDetail,
  TypeListResponse,
  TypeDetailResponse,
} from "../../shared/types/pokemon";

export function usePokemonList(offset: number, limit: number) {
  return useQuery<PokemonListResponse>({
    queryKey: ["pokemons", offset, limit],
    queryFn: () => pokemonApi.getPokemons(offset, limit),
  });
}

export function useAllPokemonNames() {
  return useQuery<PokemonListResponse>({
    queryKey: ["pokemons", "all-names"],
    queryFn: () => pokemonApi.getPokemons(0, 10000),
    staleTime: Infinity,
  });
}

export function usePokemonDetails(names: string[]) {
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

  return { data, isLoading, isError };
}

export function useTypeList() {
  return useQuery<TypeListResponse>({
    queryKey: ["types"],
    queryFn: () => pokemonApi.getTypes(),
  });
}

export function useTypeDetail(typeName: string) {
  return useQuery<TypeDetailResponse>({
    queryKey: ["type", typeName],
    queryFn: () => pokemonApi.getType(typeName),
    enabled: !!typeName,
  });
}
