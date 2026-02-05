import { LoadingSpinner, ErrorMessage } from "../../shared/components";
import type { PokemonDetail } from "../../shared/types/pokemon";
import { styles, typeColors } from "./styles";

interface PokemonDetailLayoutProps {
  pokemon: PokemonDetail | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
  goBack: () => void;
}

export function PokemonDetailLayout({
  pokemon,
  isLoading,
  isError,
  refetch,
  isFavorite,
  toggleFavorite,
  goBack,
}: PokemonDetailLayoutProps) {
  if (isLoading) return <LoadingSpinner message="Loading Pok\u00e9mon..." />;
  if (isError || !pokemon)
    return (
      <ErrorMessage
        message="Could not load Pokemon details."
        onRetry={refetch}
      />
    );

  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  return (
    <div className={styles.container}>
      <button onClick={goBack} className={styles.backButton}>
        &larr; Back
      </button>

      <div className={styles.card}>
        <div className={styles.header}>
          {artwork ? (
            <img src={artwork} alt={pokemon.name} className={styles.image} />
          ) : (
            <div className={styles.imagePlaceholder}>No image</div>
          )}

          <div className={styles.info}>
            <p className={styles.id}>#{String(pokemon.id).padStart(3, "0")}</p>
            <h1 className={styles.name}>{pokemon.name}</h1>

            <button
              onClick={toggleFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : styles.favoriteInactive}`}
            >
              {isFavorite ? "\u2665" : "\u2661"}{" "}
              {isFavorite ? "Favorited" : "Favorite"}
            </button>

            <div className={styles.typeBadges}>
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`${styles.typeBadge} ${typeColors[t.type.name] ?? "bg-gray-500"}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className={styles.meta}>
              <span>Height: {pokemon.height / 10} m</span>
              <span>Weight: {pokemon.weight / 10} kg</span>
            </div>
          </div>
        </div>

        <section className={styles.section} aria-label="Base stats">
          <h2 className={styles.sectionTitle}>Base Stats</h2>
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className={styles.statRow}>
              <span className={styles.statName}>{s.stat.name}</span>
              <div className={styles.statBarOuter}>
                <div
                  className={styles.statBarInner}
                  style={{ width: `${(s.base_stat / 255) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={s.base_stat}
                  aria-valuemin={0}
                  aria-valuemax={255}
                  aria-label={`${s.stat.name}: ${s.base_stat}`}
                />
              </div>
              <span className={styles.statValue}>{s.base_stat}</span>
            </div>
          ))}
        </section>

        <section className={styles.section} aria-label="Abilities">
          <h2 className={styles.sectionTitle}>Abilities</h2>
          <div className={styles.abilitiesList}>
            {pokemon.abilities.map((a) => (
              <span key={a.ability.name} className={styles.abilityBadge}>
                {a.ability.name.replace("-", " ")}
                {a.is_hidden && " (hidden)"}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
