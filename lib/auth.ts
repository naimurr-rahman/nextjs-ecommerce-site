export function login(u: string, p: string) {
  if (u === "admin" && p === "1234") {
    localStorage.setItem("user", JSON.stringify({ name: "Admin" }));
    return true;
  }
  return false;
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

export function logout() {
  localStorage.removeItem("user");
}
