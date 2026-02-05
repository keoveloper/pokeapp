import { Link } from "react-router-dom";
import type { PokemonDetail } from "../types/pokemon";

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="block rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      <div className="flex flex-col items-center p-4">
        {artwork ? (
          <img
            src={artwork}
            alt={pokemon.name}
            className="h-28 w-28 object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded bg-gray-100 text-xs text-gray-400">
            No image
          </div>
        )}
        <p className="mt-2 text-xs text-gray-400">
          #{String(pokemon.id).padStart(3, "0")}
        </p>
        <h3 className="text-sm font-semibold capitalize text-gray-800">
          {pokemon.name}
        </h3>
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${typeColors[t.type.name] ?? "bg-gray-500"}`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
