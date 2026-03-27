export default function Loading() {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-10 bg-gray-300 w-1/3 mb-6 mx-auto"></div>

      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-gray-300 rounded"></div>
        ))}
      </div>
    </div>
  );
}
