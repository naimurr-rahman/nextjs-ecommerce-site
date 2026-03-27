export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-40 bg-gray-300 rounded"></div>
      ))}
    </div>
  );
}
