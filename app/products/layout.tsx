import { CartProvider } from "../../context/CartContext"; // from app to context

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Products Section</h2>
        <p className="text-gray-500 mt-2">
          Browse our collection and find what you love
        </p>
        <hr className="mt-4 border-gray-300" />
      </div>

      {/* Products Content */}
      <div>{children}</div>
    </section>
  );
}
