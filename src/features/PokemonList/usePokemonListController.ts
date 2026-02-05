import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedValue } from "../../shared/hooks";
import {
  usePokemonList,
  useAllPokemonNames,
  usePokemonDetails,
  useTypeList,
  useTypeDetail,
} from "./services";

const PAGE_SIZE = 20;

export function usePokemonListController() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const type = searchParams.get("type") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const offset = (page - 1) * PAGE_SIZE;

  // Server-side paginated list (no type filter, no search)
  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
  } = usePokemonList(offset, PAGE_SIZE);

  // All names for client-side search
  const {
    data: allNamesData,
    isLoading: isAllNamesLoading,
  } = useAllPokemonNames();

  // Type detail (when type filter is active)
  const {
    data: typeData,
    isLoading: isTypeLoading,
    isError: isTypeError,
  } = useTypeDetail(type);

  // Type list for the dropdown
  const { data: typesData } = useTypeList();

  // Compute which pokemon names to show
  const { names, totalCount } = useMemo(() => {
    if (type && typeData) {
      // Client-side mode: filter by type, then by search, then paginate
      let filtered = typeData.pokemon.map((p) => p.pokemon.name);

      if (debouncedSearch) {
        const lower = debouncedSearch.toLowerCase();
        filtered = filtered.filter((n) => n.includes(lower));
      }

      const total = filtered.length;
      const sliced = filtered.slice(offset, offset + PAGE_SIZE);
      return { names: sliced, totalCount: total };
    }

    // When searching, filter against ALL pokemon names
    if (debouncedSearch && allNamesData) {
      const lower = debouncedSearch.toLowerCase();
      const filtered = allNamesData.results
        .map((p) => p.name)
        .filter((n) => n.includes(lower));

      const total = filtered.length;
      const sliced = filtered.slice(offset, offset + PAGE_SIZE);
      return { names: sliced, totalCount: total };
    }

    // No search: server-side pagination
    if (listData) {
      return {
        names: listData.results.map((p) => p.name),
        totalCount: listData.count,
      };
    }

    return { names: [] as string[], totalCount: 0 };
  }, [type, typeData, listData, allNamesData, debouncedSearch, offset]);

  // Fetch details for the computed names
  const {
    data: pokemons,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = usePokemonDetails(names);

  const isLoading = type
    ? isTypeLoading
    : debouncedSearch
      ? isAllNamesLoading
      : isListLoading;
  const isError = type ? isTypeError : isListError;

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Available types for dropdown (filter out non-standard types like "unknown" and "shadow")
  const types = useMemo(() => {
    if (!typesData) return [];
    return typesData.results.filter(
      (t) => t.name !== "unknown" && t.name !== "shadow",
    );
  }, [typesData]);

  // URL sync helpers
  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    for (const [k, v] of Object.entries(updates)) {
      if (v) {
        next.set(k, v);
      } else {
        next.delete(k);
      }
    }
    setSearchParams(next, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    // We use an effect-like approach: debounced value triggers URL update
    // But we need to update URL when debounced value changes
    // Instead, update URL immediately with the debounced approach via setTimeout
    updateParams({ search: value, page: "1" });
  };

  const handleTypeChange = (value: string) => {
    updateParams({ type: value, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
  };

  return {
    pokemons,
    isLoading,
    isDetailsLoading,
    isError: isError || isDetailsError,
    searchInput,
    type,
    page,
    totalPages,
    types,
    handleSearchChange,
    handleTypeChange,
    handlePageChange,
  };
}
