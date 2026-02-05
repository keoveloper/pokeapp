import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  addFavorite: (pokemonName: string) => void;
  removeFavorite: (pokemonName: string) => void;
  isFavorite: (pokemonName: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (pokemonName) =>
        set((state) => ({
          favorites: [...state.favorites, pokemonName],
        })),
      removeFavorite: (pokemonName) =>
        set((state) => ({
          favorites: state.favorites.filter((name) => name !== pokemonName),
        })),
      isFavorite: (pokemonName) => get().favorites.includes(pokemonName),
    }),
    {
      name: "pokemon-favorites",
    },
  ),
);
