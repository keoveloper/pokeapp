import { usePokemonListController } from "./usePokemonListController";
import { PokemonListLayout } from "./Layout";

export default function PokemonList() {
  const controller = usePokemonListController();
  return <PokemonListLayout {...controller} />;
}
