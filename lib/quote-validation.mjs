export const MAX_PHOTO_BYTES = 20 * 1024 * 1024;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const services = [
  "Duguláselhárítás",
  "WOMA csatornatisztítás",
  "Csatorna kamerázás",
  "Egyéb",
];
const urgencies = ["Azonnal szeretném", "A következő 1–3 napban"];

/** Validate every browser-supplied field before forwarding a quote request. */
export function validateQuote(form) {
  /** @type {Record<string, string>} */
  const values = {};
  for (const key of [
    "lastName",
    "firstName",
    "email",
    "phone",
    "location",
    "service",
    "urgency",
    "message",
  ]) {
    const value = form.get(key);
    if (value !== null && typeof value !== "string")
      return {
        error: "Érvénytelen űrlapadat. Kérjük, töltse ki újra az űrlapot.",
      };
    values[key] = (value || "").trim();
  }
  if (String(form.get("website") || "").trim())
    return { error: "Az űrlap nem küldhető el. Kérjük, hívjon telefonon." };
  if (
    !values.lastName ||
    !values.firstName ||
    values.lastName.length > 80 ||
    values.firstName.length > 80 ||
    /[\r\n]/.test(values.lastName + values.firstName)
  )
    return {
      error:
        "Kérjük, adja meg a vezeték- és keresztnevét (legfeljebb 80 karakter).",
    };
  if (
    values.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  )
    return { error: "Kérjük, ellenőrizze az email-címét." };
  if (
    !/^[+()\d\s.\-]+$/.test(values.phone) ||
    values.phone.replace(/\D/g, "").length < 8 ||
    values.phone.replace(/\D/g, "").length > 15 ||
    values.phone.length > 24
  )
    return {
      error:
        "Kérjük, adjon meg egy elérhető telefonszámot körzetszámmal együtt.",
    };
  if (!values.location || values.location.length > 160)
    return {
      error: "Kérjük, adja meg a munkavégzés települését vagy kerületét.",
    };
  if (!services.includes(values.service))
    return { error: "Kérjük, válassza ki a szolgáltatást." };
  if (!urgencies.includes(values.urgency))
    return { error: "Kérjük, válassza ki, mennyire sürgős a probléma." };
  if (values.message.length > 4000)
    return { error: "A probléma leírása legfeljebb 4000 karakter lehet." };
  if (form.get("consent") !== "accepted")
    return {
      error: "Az ajánlatkéréshez szükséges az adatkezelési hozzájárulás.",
    };
  const photos = form.getAll("photos");
  if (photos.length > 5) return { error: "Legfeljebb 5 fotó csatolható." };
  if (
    photos.some(
      (photo) =>
        typeof photo === "string" ||
        !PHOTO_TYPES.includes(photo.type) ||
        photo.size === 0,
    )
  )
    return { error: "Csak JPG, PNG és WebP képek csatolhatók." };
  if (photos.reduce((total, photo) => total + photo.size, 0) > MAX_PHOTO_BYTES)
    return { error: "A csatolmányok összmérete legfeljebb 20 MB lehet." };
  return { values, photos };
}

export function isImageHeader(bytes, type) {
  if (type === "image/jpeg")
    return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (type === "image/png")
    return [137, 80, 78, 71, 13, 10, 26, 10].every(
      (value, index) => bytes[index] === value,
    );
  if (type === "image/webp")
    return (
      bytes.length >= 12 &&
      String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
    );
  return false;
}
