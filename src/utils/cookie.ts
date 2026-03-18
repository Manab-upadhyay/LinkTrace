/**
 * Retrieves the CSRF token from the browser's cookies.
 * Assumes the token is stored in a cookie named "csrfToken".
 */
export const getCsrfToken = (): string | null => {
  const name = "csrfToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};
