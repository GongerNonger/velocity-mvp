export function AmbientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="animate-orb-1 absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-green-900/12 blur-3xl" />
      <div className="animate-orb-2 absolute top-1/2 -right-48 w-[400px] h-[400px] rounded-full bg-emerald-900/10 blur-3xl" />
      <div className="animate-orb-3 absolute -bottom-48 left-1/3 w-[450px] h-[450px] rounded-full bg-gray-700/12 blur-3xl" />
    </div>
  );
}
