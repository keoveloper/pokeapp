interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>
  );
}
