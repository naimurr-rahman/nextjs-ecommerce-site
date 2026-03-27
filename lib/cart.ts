export function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function addToCart(product: any) {
  const cart = getCart();

  const existing = cart.find((item: any) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function removeFromCart(id: number) {
  const cart = getCart().filter((item: any) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function updateQuantity(id: number, type: "inc" | "dec") {
  const cart = getCart();

  const item = cart.find((i: any) => i.id === id);

  if (!item) return;

  if (type === "inc") item.quantity += 1;
  if (type === "dec" && item.quantity > 1) item.quantity -= 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}
