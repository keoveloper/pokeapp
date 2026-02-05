# PokeApp

Una Single Page Application (SPA) para explorar el mundo Pokemon, construida con React 19 y consumiendo la [PokeAPI v2](https://pokeapi.co/api/v2).

## Desarrollo asistido por IA

Este proyecto fue desarrollado con la asistencia de **Claude Code** (Anthropic). Creo firmemente que la inteligencia artificial es una herramienta fundamental en el desarrollo de software moderno. No se trata de reemplazar al desarrollador, sino de potenciarlo: la IA ayuda a tomar mejores decisiones arquitectonicas, a resolver problemas mas rapido y a mantener un codigo mas limpio y consistente.

Cada decision tecnica de este proyecto fue evaluada y validada por mi como desarrollador. La IA fue un copiloto, no el piloto.

## Tech Stack y decisiones tecnicas

### Gestor de paquetes: pnpm

Se eligio **pnpm** sobre npm o yarn por su manejo eficiente del disco duro (usa un store global con hard links en lugar de duplicar paquetes en cada proyecto) y por su velocidad de instalacion superior.

### Framework y lenguaje: React 19 + TypeScript

- **React 19** por ser la version mas reciente y estable, con mejoras en rendimiento y hooks.
- **TypeScript** con modo estricto (`strict`, `noUnusedLocals`, `noUnusedParameters`) para tener un codigo mas seguro y con mejor autocompletado en el editor.

### Bundler: Vite

**Vite** como bundler por su velocidad de arranque practicamente instantanea gracias a ESBuild y su Hot Module Replacement (HMR) ultrarapido. Es el estandar actual para proyectos React modernos.

### Estilos: Tailwind CSS 3.4.17

Se uso **Tailwind CSS** por su enfoque utility-first que permite estilizar componentes directamente en el JSX sin necesidad de archivos CSS separados, lo que acelera mucho el desarrollo.

**Nota importante sobre la version:** Inicialmente se instalo Tailwind CSS 4 (la version mas reciente), pero presento problemas de compatibilidad con la configuracion de PostCSS y el ecosistema actual de Vite. La solucion fue hacer un downgrade a la version estable 3.4.17:

```bash
pnpm remove tailwindcss
pnpm add -DE tailwindcss@3.4.17 postcss autoprefixer
```

La version 3.x es actualmente la mas probada y compatible con el resto del ecosistema, por lo que fue la decision correcta para evitar problemas en el build.

### Routing: React Router DOM 7

**React Router DOM** es el estandar de facto para routing en React SPAs. Se configuran tres rutas principales:

| Ruta | Vista | Descripcion |
|------|-------|-------------|
| `/` | PokemonList | Listado paginado con busqueda y filtro por tipo |
| `/pokemon/:name` | PokemonDetail | Detalle completo de un Pokemon |
| `/favorites` | Favorites | Lista de Pokemon marcados como favoritos |

### Estado del servidor: TanStack React Query

**React Query** para manejar todo el estado que viene del servidor (fetching, caching, sincronizacion). Configurado con:

- **5 min** de stale time (los datos se consideran frescos durante 5 minutos)
- **30 min** de cache time (los datos se mantienen en memoria 30 minutos)
- **2 reintentos** en caso de error
- Sin refetch al volver a la ventana (para no hacer llamadas innecesarias a la API)

Esto permite una experiencia fluida donde navegar entre paginas ya visitadas es instantaneo.

### Estado del cliente: Zustand

**Zustand** para el estado local de la aplicacion (favoritos). Es mucho mas simple que Redux, sin boilerplate innecesario. Los favoritos se persisten en `localStorage` usando el middleware `persist`, asi que no se pierden al cerrar el navegador.

### HTTP: Axios

**Axios** como cliente HTTP por su API limpia, interceptores, y manejo de timeouts. Configurado con:

- Base URL: `https://pokeapi.co/api/v2`
- Timeout: 10 segundos

### Virtualizacion: react-window

**react-window** para renderizar la lista de Pokemon de forma eficiente. En lugar de renderizar los 20 Pokemon de golpe en el DOM, virtualiza las filas visibles, lo que mejora el rendimiento especialmente en dispositivos moviles.

## Instalacion

### Prerequisitos

- **Node.js** >= 18
- **pnpm** (instalar globalmente si no lo tienes):
  ```bash
  npm install -g pnpm
  ```

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd pokeapp
   ```

2. Instalar dependencias:
   ```bash
   pnpm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

La aplicacion estara disponible en `http://localhost:5173`.

## Scripts disponibles

| Comando | Descripcion |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo con HMR |
| `pnpm build` | Verifica tipos con TypeScript y genera el build de produccion |
| `pnpm lint` | Ejecuta ESLint para revisar el codigo |
| `pnpm preview` | Previsualiza el build de produccion localmente |

## Dependencias instaladas

### Produccion

| Paquete | Version | Proposito |
|---------|---------|-----------|
| react | 19.2.0 | Libreria principal de UI |
| react-dom | 19.2.0 | Renderizado de React en el DOM |
| react-router-dom | 7.13.0 | Enrutamiento SPA |
| @tanstack/react-query | 5.90.20 | Manejo de estado del servidor (fetching, cache) |
| @tanstack/query-sync-storage-persister | 5.90.22 | Persistencia del cache de React Query |
| @tanstack/react-query-persist-client | 5.90.22 | Cliente de persistencia para React Query |
| axios | 1.13.4 | Cliente HTTP |
| react-window | 2.2.6 | Virtualizacion de listas largas |
| zustand | 5.0.11 | Manejo de estado del cliente (favoritos) |

### Desarrollo

| Paquete | Version | Proposito |
|---------|---------|-----------|
| typescript | ~5.9.3 | Tipado estatico |
| vite | 7.2.4 | Bundler y servidor de desarrollo |
| @vitejs/plugin-react | 5.1.1 | Integracion React con Vite |
| tailwindcss | 3.4.17 | Framework de utilidades CSS |
| postcss | 8.5.6 | Procesamiento de CSS (requerido por Tailwind) |
| autoprefixer | 10.4.24 | Agrega prefijos CSS automaticamente |
| eslint | 9.39.1 | Linter de codigo |
| eslint-plugin-react-hooks | 7.0.1 | Reglas de ESLint para hooks de React |
| eslint-plugin-react-refresh | 0.4.24 | Reglas de ESLint para React Refresh |
| @types/react | 19.2.5 | Tipos de TypeScript para React |
| @types/react-dom | 19.2.3 | Tipos de TypeScript para React DOM |
| @types/react-router-dom | 5.3.3 | Tipos de TypeScript para React Router |
| @types/react-window | 2.0.0 | Tipos de TypeScript para react-window |
| @types/node | 24.10.1 | Tipos de TypeScript para Node.js |

## Estructura del proyecto

```
src/
├── services/api.ts              # Cliente Axios y funciones de la API
├── stores/favoritesStore.ts     # Store de Zustand para favoritos
├── features/                    # Modulos por funcionalidad
│   ├── PokemonList/             # Listado paginado con busqueda y filtros
│   ├── PokemonDetail/           # Vista de detalle de un Pokemon
│   └── Favorites/               # Vista de favoritos
├── shared/
│   ├── components/              # Componentes reutilizables (PokemonCard, etc.)
│   ├── hooks/                   # Hooks personalizados
│   ├── types/                   # Tipos de TypeScript compartidos
│   └── utils/                   # Utilidades (debounce, etc.)
└── App.tsx                      # Configuracion de QueryClient, Router y rutas
```
