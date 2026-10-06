/**
 * Données de contenu de la série `metiers-de-la-tech`.
 *
 * On y place tout ce qui est **réutilisé par plusieurs vidéos** de la série :
 * fiches métiers, chiffres clés, libellés de sections, listes de sources…
 *
 * Une donnée propre à une seule vidéo peut rester dans le fichier de la vidéo.
 *
 * ⚠️ Aucun contenu de vidéo n'est encore défini : cette tâche construit le
 * socle. Voir « Organisation des vidéos » dans docs/ARCHITECTURE.md.
 */

/** Fiche métier, base commune à toutes les vidéos de la série. */
export type TechJobData = {
  /** Identifiant technique, en kebab-case. */
  readonly id: string;
  /** Nom du métier, tel qu'affiché. */
  readonly title: string;
  /** Accroche d'une ligne. */
  readonly tagline: string;
  /** Points clés affichés dans la vidéo. */
  readonly keyPoints?: readonly string[];
};

/** Fiches métiers disponibles. Vide tant que le contenu n'a pas été rédigé. */
export const techJobs: readonly TechJobData[] = [];
