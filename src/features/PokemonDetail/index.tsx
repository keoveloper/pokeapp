import { usePokemonDetailController } from "./usePokemonDetailController";
import { PokemonDetailLayout } from "./Layout";

export default function PokemonDetail() {
  const controller = usePokemonDetailController();
  return <PokemonDetailLayout {...controller} />;
}
