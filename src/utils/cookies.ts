import Cookies from "js-cookie";

// Set a cookie
export function setCookie(key: string, value: string): void {
  Cookies.set(key, value, { expires: 30, path: "/" }); // Expires in 7 days
}

// Get a cookie
export function getCookie(key: string): string | undefined {
  return Cookies.get(key); // Returns the cookie value as string or undefined if not found
}

// Remove a cookie
export function removeCookie(key: string): void {
  Cookies.remove(key, { path: "/" });
}
