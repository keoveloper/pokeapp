import {
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  PokemonCard,
} from "../../shared/components";
import type { PokemonDetail } from "../../shared/types/pokemon";
import { styles } from "./styles";

interface FavoritesLayoutProps {
  pokemons: PokemonDetail[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  refetchAll: () => void;
}

export function FavoritesLayout({
  pokemons,
  isLoading,
  isError,
  isEmpty,
  refetchAll,
}: FavoritesLayoutProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Favorites</h1>

      {isEmpty && (
        <EmptyState
          title="No favorites yet"
          description="Browse Pokemon and tap the heart to add favorites."
        />
      )}

      {!isEmpty && isLoading && (
        <LoadingSpinner message="Loading favorites..." />
      )}

      {!isEmpty && isError && (
        <ErrorMessage
          message="Could not load some favorites."
          onRetry={refetchAll}
        />
      )}

      {!isEmpty && !isLoading && pokemons.length > 0 && (
        <div className={styles.grid}>
          {pokemons.map((p) => (
            <PokemonCard key={p.name} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  );
}
