import axios from "axios";
import type {
  PokemonListResponse,
  PokemonDetail,
  TypeListResponse,
  TypeDetailResponse,
  AbilityDetailResponse,
} from "../shared/types/pokemon";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

export const pokemonApi = {
  getPokemons: async (
    offset: number = 0,
    limit: number = 20,
  ): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>(
      `/pokemon?offset=${offset}&limit=${limit}`,
    );
    return response.data;
  },

  getPokemonByName: async (name: string): Promise<PokemonDetail> => {
    const response = await api.get<PokemonDetail>(`/pokemon/${name}`);
    return response.data;
  },

  getType: async (name: string): Promise<TypeDetailResponse> => {
    const response = await api.get<TypeDetailResponse>(`/type/${name}`);
    return response.data;
  },

  getTypes: async (): Promise<TypeListResponse> => {
    const response = await api.get<TypeListResponse>("/type");
    return response.data;
  },

  getAbility: async (name: string): Promise<AbilityDetailResponse> => {
    const response = await api.get<AbilityDetailResponse>(`/ability/${name}`);
    return response.data;
  },
};
