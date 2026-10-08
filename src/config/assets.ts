/**
 * Golden Gab — registre des assets.
 *
 * Tous les fichiers de marque vivent dans `public/assets/`.
 * Les composants ne doivent jamais écrire un chemin d'asset en dur :
 * ils passent par cette table (et donc par `staticFile()`).
 *
 * ⚠️ `logo couleur1.png` contient un espace : on l'encode en `%20` pour que
 * l'URL reste valide. Le nom de fichier sur disque n'est pas modifié.
 */

import { staticFile } from "remotion";

export const brandAssets = {
  /**
   * Logo complet Golden Gab prêt à l'emploi : monogramme + wordmark
   * "GOLDEN GAB", détouré et redimensionné (1600x1024, ratio ~1.56).
   * C'est CETTE version que les composants doivent utiliser.
   */
  logo: staticFile("assets/images/derived/logo.png"),
  /**
   * Logo d'origine, conservé intact (8334x8334, larges marges transparentes).
   * Source de vérité de la marque : ne pas modifier. Utile pour exporter de
   * nouvelles déclinaisons.
   */
  logoSource: staticFile("assets/images/logo%20couleur1.png"),
  /**
   * Planche de couleurs de référence (6 échantillons).
   * Fichier de référence documentaire : affiché dans la composition
   * `Styleguide`, jamais dans une vidéo de marque.
   */
  palette: staticFile("assets/images/couelur.png"),
  /** Motif répétable bleu nuit, à très faible opacité (texture de fond). */
  motif: staticFile("assets/images/motif.png"),
} as const;

export type BrandAsset = keyof typeof brandAssets;

/**
 * Assets de la mascotte Golden Gab.
 *
 * La mascotte est un **personnage** : chaque posture possède sa propre entrée.
 * Ajouter une pose = déposer le PNG puis ajouter une ligne ici **et** dans
 * `src/components/mascot/poses.ts` (le type `MascotPose` est dérivé du
 * registre de poses, il suit donc automatiquement).
 *
 * Les poses sont enregistrées dans `public/assets/images/mascot/`.
 * L'asset source `mascotte.png` reste intact à la racine de
 * `public/assets/images/`.
 */
export const mascotAssets = {
  thinking: staticFile("assets/images/mascot/mascot-thinking.png"),
  surprised: staticFile("assets/images/mascot/mascot-surprised.png"),
  happy: staticFile("assets/images/mascot/mascot-happy.png"),
  explaining: staticFile("assets/images/mascot/mascot-explaining.png"),
  point: staticFile("assets/images/mascot/mascot-point.png"),
} as const;

/** Clés d'asset de la mascotte (une par pose réellement disponible). */
export type MascotAssetKey = keyof typeof mascotAssets;
