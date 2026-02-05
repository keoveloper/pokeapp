import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./features/PokemonList";
import PokemonDetail from "./features/PokemonDetail";
import Favorites from "./features/Favorites";
import { OfflineIndicator } from "./shared/components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <OfflineIndicator />
          <nav
            className="bg-blue-700 p-4 text-white"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-lg font-bold hover:text-red-500">
                PokeApp
              </Link>
              <Link to="/favorites" className="hover:text-red-500">
                Favorites
              </Link>
            </div>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/pokemon/:name" element={<PokemonDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}

export default App;
