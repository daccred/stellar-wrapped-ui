export function FallbackComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white/10">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Oops! Story Not Found
      </h1>
      <p className="text-lg mb-8 text-white/50">
        We couldn&apos;t find the story you&apos;re looking for.
      </p>
    </div>
  );
}
