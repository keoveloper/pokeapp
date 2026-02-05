interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div role="status" className="flex flex-col items-center justify-center py-12">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-red-600" />
      <p className="mt-3 text-sm text-gray-500">{message}</p>
    </div>
  );
}
