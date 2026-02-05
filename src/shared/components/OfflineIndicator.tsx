import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

export function OfflineIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  if (isOnline) return null;

  return (
    <div
      role="alert"
      className="bg-yellow-400 px-4 py-2 text-center text-sm font-medium text-yellow-900"
    >
      You are offline. Showing cached data.
    </div>
  );
}
