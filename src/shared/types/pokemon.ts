export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilitySlot {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
  sprites: PokemonSprites;
}

export interface TypeListItem {
  name: string;
  url: string;
}

export interface TypeListResponse {
  count: number;
  results: TypeListItem[];
}

export interface TypePokemonEntry {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface TypeDetailResponse {
  id: number;
  name: string;
  pokemon: TypePokemonEntry[];
}

export interface AbilityEffectEntry {
  effect: string;
  short_effect: string;
  language: {
    name: string;
    url: string;
  };
}

export interface AbilityDetailResponse {
  id: number;
  name: string;
  effect_entries: AbilityEffectEntry[];
}
