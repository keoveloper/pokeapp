import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { List } from "react-window";
import {
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  PokemonCard,
} from "../../shared/components";
import type { PokemonDetail } from "../../shared/types/pokemon";
import type { TypeListItem } from "../../shared/types/pokemon";
import { styles } from "./styles";

interface PokemonRowProps {
  pokemons: PokemonDetail[];
  cols: number;
}

function PokemonRow({
  index,
  style,
  ariaAttributes,
  pokemons,
  cols,
}: {
  index: number;
  style: CSSProperties;
  ariaAttributes: Record<string, unknown>;
  pokemons: PokemonDetail[];
  cols: number;
}) {
  const start = index * cols;
  const items = pokemons.slice(start, start + cols);

  return (
    <div
      {...ariaAttributes}
      style={{
        ...style,
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {items.map((p) => (
        <PokemonCard key={p.name} pokemon={p} />
      ))}
    </div>
  );
}

interface PokemonListLayoutProps {
  pokemons: PokemonDetail[];
  isLoading: boolean;
  isDetailsLoading: boolean;
  isError: boolean;
  searchInput: string;
  type: string;
  page: number;
  totalPages: number;
  types: TypeListItem[];
  handleSearchChange: (value: string) => void;
  handleTypeChange: (value: string) => void;
  handlePageChange: (page: number) => void;
}

function calcColumns(width: number) {
  if (width >= 1024) return 5;
  if (width >= 768) return 4;
  if (width >= 640) return 3;
  return 2;
}

function useContainerColumns(ref: React.RefObject<HTMLDivElement | null>) {
  const [cols, setCols] = useState(() => calcColumns(window.innerWidth));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setCols(calcColumns(w));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return cols;
}

export function PokemonListLayout({
  pokemons,
  isLoading,
  isDetailsLoading,
  isError,
  searchInput,
  type,
  page,
  totalPages,
  types,
  handleSearchChange,
  handleTypeChange,
  handlePageChange,
}: PokemonListLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cols = useContainerColumns(containerRef);

  const ROW_HEIGHT = 250;
  const rowCount = Math.ceil(pokemons.length / cols);
  const listHeight = rowCount * ROW_HEIGHT;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pok&eacute;dex</h1>

      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <label htmlFor="pokemon-search" className={styles.searchLabel}>
            Search Pok&eacute;mon
          </label>
          <input
            id="pokemon-search"
            type="text"
            placeholder="Search by name..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.selectWrapper}>
          <label htmlFor="pokemon-type" className={styles.selectLabel}>
            Filter by type
          </label>
          <select
            id="pokemon-type"
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className={styles.select}
          >
            <option value="">All types</option>
            {types.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <LoadingSpinner message="Loading Pok\u00e9mon..." />}

      {isError && (
        <ErrorMessage message="Could not load Pok\u00e9mon." />
      )}

      {!isLoading && !isError && pokemons.length === 0 && (
        <EmptyState
          title="No Pok\u00e9mon found"
          description="Try a different search or filter."
        />
      )}

      {!isLoading && !isError && pokemons.length > 0 && (
        <>
          {isDetailsLoading && (
            <LoadingSpinner message="Loading details..." />
          )}

          <div ref={containerRef}>
            {!isDetailsLoading && (
              <List<PokemonRowProps>
                rowComponent={PokemonRow}
                rowProps={{ pokemons, cols }}
                rowCount={rowCount}
                rowHeight={ROW_HEIGHT}
                style={{ height: listHeight, overflow: "visible" }}
              />
            )}
          </div>

          <nav className={styles.pagination} aria-label="Pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className={styles.pageButton}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className={styles.pageButton}
            >
              Next
            </button>
          </nav>
        </>
      )}
    </div>
  );
}
