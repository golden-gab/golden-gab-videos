/**
 * Helpers couleur.
 *
 * Permet de produire une couleur translucide à partir d'une teinte de la
 * palette, sans réintroduire de valeur hexadécimale en dur dans un composant.
 */

const expandHex = (hex: string): string => {
  const value = hex.replace("#", "");

  if (value.length === 3) {
    return value
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }

  return value;
};

/**
 * Ajoute un canal alpha à une couleur hexadécimale.
 *
 * ```ts
 * withAlpha(palette.charcoal, 0.6); // "rgba(43, 44, 44, 0.6)"
 * ```
 */
export const withAlpha = (hex: string, alpha: number): string => {
  const value = expandHex(hex);
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
