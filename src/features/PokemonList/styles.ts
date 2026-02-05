export const styles = {
  container: "container mx-auto px-4 py-8",
  title: "mb-6 text-2xl font-bold text-gray-800",
  filterBar:
    "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center",
  searchWrapper: "relative flex-1",
  searchLabel: "sr-only",
  searchInput:
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm",
  selectWrapper: "w-full sm:w-48",
  selectLabel: "sr-only",
  select:
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm",
  grid: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  pagination: "mt-8 flex items-center justify-center gap-4",
  pageButton:
    "rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
  pageInfo: "text-sm text-gray-600",
} as const;
