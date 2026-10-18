/**
 * Épisode Web Story · « Tu dors déjà »
 *
 * 30 beats audio-driven rythmés de 1 à 3 secondes.
 * L'audio est la source de vérité temporelle (74,50 s).
 * Données pures : aucun import React/Remotion.
 */

import type { Episode } from "../../../scenes/types";
import { webStoryAudio, webStoryTranscript } from "./transcript.ts";

export const webStoryEpisode: Episode = {
  id: "web-story-c-est-quoi-site-web",
  title: "Tu dors déjà ? — Pourquoi avoir un site web",
  description: "Comment un site vitrine informe tes prospects TikTok à 23h quand tu dors déjà.",
  audio: webStoryAudio,
  transcript: webStoryTranscript,
  metadata: {
    series: "web-story",
    subject: "Intérêt d'un site web pour les créateurs / entrepreneurs",
    angle: "Transformer un prospect nocturne intéressé en lead informé sans attendre le réveil.",
    tags: ["web", "site-web", "entrepreneuriat", "prospects", "visibilite"],
  },
  scenes: [
  {
    "id": "beat-01",
    "type": "hero",
    "start": 0,
    "end": 4.2,
    "transcript": "Et si un client voulait découvrir tes services alors que tu dors déjà ?",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "sfx": [
      {
        "at": {
          "frame": 6
        },
        "name": "whoosh"
      }
    ],
    "metadata": {
      "beatNumber": 1,
      "objective": "Lune, horloge et Zzz nocturnes avec mascotte thinking"
    }
  },
  {
    "id": "beat-02",
    "type": "callout",
    "start": 4.2,
    "end": 7.11,
    "transcript": "Imagine qu'un client X ait entendu parler de ton activité que",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 16
        },
        "name": "pop"
      }
    ],
    "metadata": {
      "beatNumber": 2,
      "objective": "Smartphone et notification prospect Client X"
    }
  },
  {
    "id": "beat-03",
    "type": "explanation",
    "start": 7.11,
    "end": 10.04,
    "transcript": "tu nous présentes ici chaque jour sur TikTok.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "metadata": {
      "beatNumber": 3,
      "objective": "Feed vidéo TikTok stylisé dans le smartphone"
    }
  },
  {
    "id": "beat-04",
    "type": "callout",
    "start": 10.04,
    "end": 11.88,
    "transcript": "Il semble intéressé par ce que tu proposes et",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "bottom"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 35
        },
        "name": "ding"
      }
    ],
    "metadata": {
      "beatNumber": 4,
      "objective": "Tap profil et étincelle corail prospect intéressé"
    }
  },
  {
    "id": "beat-05",
    "type": "hero",
    "start": 11.88,
    "end": 13.38,
    "transcript": "il va en savoir plus.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "metadata": {
      "beatNumber": 5,
      "objective": "Bouton CTA En savoir plus"
    }
  },
  {
    "id": "beat-06",
    "type": "callout",
    "start": 13.38,
    "end": 15.09,
    "transcript": "Mais le problème, il est déjà 23h,",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 53
        },
        "name": "click"
      }
    ],
    "metadata": {
      "beatNumber": 6,
      "objective": "Horloge digitale 23:00 et assombrissement nocturne"
    }
  },
  {
    "id": "beat-07",
    "type": "explanation",
    "start": 15.09,
    "end": 17.05,
    "transcript": "tu n'es plus disponible, tu dors déjà.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "metadata": {
      "beatNumber": 7,
      "objective": "Pastille Hors ligne et sommeil mascotte thinking"
    }
  },
  {
    "id": "beat-08",
    "type": "callout",
    "start": 17.05,
    "end": 18.77,
    "transcript": "Alors, qu'est-ce qu'il va faire ?",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "center"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 61
        },
        "name": "whoosh"
      }
    ],
    "metadata": {
      "beatNumber": 8,
      "objective": "Point interrogation et mascotte surprised"
    }
  },
  {
    "id": "beat-09",
    "type": "explanation",
    "start": 18.77,
    "end": 21.17,
    "transcript": "Est-ce qu'il va attendre demain pour en savoir plus ?",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "metadata": {
      "beatNumber": 9,
      "objective": "Calendrier Demain et sablier qui s'écoule"
    }
  },
  {
    "id": "beat-10",
    "type": "callout",
    "start": 21.17,
    "end": 23.86,
    "transcript": "Non, il va probablement passer à autre chose.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 81
        },
        "name": "swipe"
      }
    ],
    "metadata": {
      "beatNumber": 10,
      "objective": "Swipe vers le haut et prospect qui passe à autre chose"
    }
  },
  {
    "id": "beat-11",
    "type": "hero",
    "start": 23.86,
    "end": 27.24,
    "transcript": "Et c'est justement là l'un des avantages des sites web.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "bottom"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 91
        },
        "name": "ding"
      }
    ],
    "metadata": {
      "beatNumber": 11,
      "objective": "BrowserFrame avec badge 24/7 ouvert"
    }
  },
  {
    "id": "beat-12",
    "type": "explanation",
    "start": 27.24,
    "end": 29.55,
    "transcript": "Tu peux y présenter toute ton entreprise,",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "metadata": {
      "beatNumber": 12,
      "objective": "Section À propos et identité entreprise déployée"
    }
  },
  {
    "id": "beat-13",
    "type": "diagram",
    "start": 29.55,
    "end": 31.3,
    "transcript": "expliquer tes services,",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "metadata": {
      "beatNumber": 13,
      "objective": "3 tuiles de services et prestations"
    }
  },
  {
    "id": "beat-14",
    "type": "explanation",
    "start": 31.3,
    "end": 32.76,
    "transcript": "montrer tes réalisations et",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "metadata": {
      "beatNumber": 14,
      "objective": "Portfolio et galerie de réalisations"
    }
  },
  {
    "id": "beat-15",
    "type": "callout",
    "start": 32.76,
    "end": 34.73,
    "transcript": "indiquer comment te contacter.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 112
        },
        "name": "pop"
      }
    ],
    "metadata": {
      "beatNumber": 15,
      "objective": "Formulaire de contact et bouton d'envoi"
    }
  },
  {
    "id": "beat-16",
    "type": "comparison",
    "start": 34.73,
    "end": 37.59,
    "transcript": "Comme ça, même quand tu n'es pas disponible,",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "metadata": {
      "beatNumber": 16,
      "objective": "Split-view site ouvert vs bureau fermé"
    }
  },
  {
    "id": "beat-17",
    "type": "explanation",
    "start": 37.59,
    "end": 39.9,
    "transcript": "tu es occupé, tu dors, je ne sais pas quoi.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "metadata": {
      "beatNumber": 17,
      "objective": "Triptyque occupé/sommeil/détente et mascotte thinking"
    }
  },
  {
    "id": "beat-18",
    "type": "explanation",
    "start": 39.9,
    "end": 43.54,
    "transcript": "Les personnes intéressées peuvent toujours découvrir ton activité",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "bottom"
    },
    "metadata": {
      "beatNumber": 18,
      "objective": "Visiteur explorant le site en autonomie"
    }
  },
  {
    "id": "beat-19",
    "type": "comparison",
    "start": 43.54,
    "end": 46.47,
    "transcript": "et décider si ce que tu proposes correspond",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "metadata": {
      "beatNumber": 19,
      "objective": "Comparatif 2 colonnes décision d'offre"
    }
  },
  {
    "id": "beat-20",
    "type": "hero",
    "start": 46.47,
    "end": 48.76,
    "transcript": "à ce qu'il veut à leur besoin.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "bottom"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 153
        },
        "name": "ding"
      }
    ],
    "metadata": {
      "beatNumber": 20,
      "objective": "Pièce de puzzle qui s'emboîte sur le besoin"
    }
  },
  {
    "id": "beat-21",
    "type": "callout",
    "start": 48.76,
    "end": 51.65,
    "transcript": "Mais il faut faire la différence, ça ne veut pas dire qu'un",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 159
        },
        "name": "whoosh"
      }
    ],
    "metadata": {
      "beatNumber": 21,
      "objective": "Carte attention et mascotte explaining"
    }
  },
  {
    "id": "beat-22",
    "type": "callout",
    "start": 51.65,
    "end": 54.56,
    "transcript": "site web va automatiquement t'apporter des clients.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "bottom"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 169
        },
        "name": "error"
      }
    ],
    "metadata": {
      "beatNumber": 22,
      "objective": "Baguette magique barrée non automatique"
    }
  },
  {
    "id": "beat-23",
    "type": "diagram",
    "start": 54.56,
    "end": 57.32,
    "transcript": "Mais si quelqu'un entend parler de ton activité,",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "metadata": {
      "beatNumber": 23,
      "objective": "Schéma bouche-à-oreille et orientation vers le site"
    }
  },
  {
    "id": "beat-24",
    "type": "callout",
    "start": 57.32,
    "end": 59.37,
    "transcript": "il aura moins un endroit où se renseigner",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 185
        },
        "name": "pop"
      }
    ],
    "metadata": {
      "beatNumber": 24,
      "objective": "Balise de localisation virtuelle et documents"
    }
  },
  {
    "id": "beat-25",
    "type": "hero",
    "start": 59.37,
    "end": 62.09,
    "transcript": "sans devoir attendre que tu sois disponible.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 191
        },
        "name": "click"
      }
    ],
    "metadata": {
      "beatNumber": 25,
      "objective": "Cadenas déverrouillé et accès libre 24/7"
    }
  },
  {
    "id": "beat-26",
    "type": "hero",
    "start": 62.09,
    "end": 65.3,
    "transcript": "Alors dis-moi, si quelqu'un découvre ton entreprise,",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "metadata": {
      "beatNumber": 26,
      "objective": "Mascotte point apostrophant le spectateur"
    }
  },
  {
    "id": "beat-27",
    "type": "callout",
    "start": 65.3,
    "end": 66.8,
    "transcript": "ce soir pendant que tu dors.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "top"
    },
    "metadata": {
      "beatNumber": 27,
      "objective": "Rappel nuit étoilée et sommeil"
    }
  },
  {
    "id": "beat-28",
    "type": "callout",
    "start": 66.8,
    "end": 70.28,
    "transcript": "Est-ce qu'il va en savoir plus sans t'envoyer un message ?",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "bottom"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 213
        },
        "name": "ding"
      }
    ],
    "metadata": {
      "beatNumber": 28,
      "objective": "Dilemme message en attente vs lien immédiat"
    }
  },
  {
    "id": "beat-29",
    "type": "callout",
    "start": 70.28,
    "end": 72.36,
    "transcript": "N'hésite pas à t'abonner si tu aimes ce genre de contenu.",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "low"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 223
        },
        "name": "pop"
      }
    ],
    "metadata": {
      "beatNumber": 29,
      "objective": "Bouton S'abonner et mascotte happy"
    }
  },
  {
    "id": "beat-30",
    "type": "conclusion",
    "start": 72.36,
    "end": 74.5,
    "transcript": "Allez, ciao !",
    "visual": {
      "component": "WebStoryScene"
    },
    "captions": {
      "enabled": true,
      "position": "center"
    },
    "sfx": [
      {
        "at": {
          "wordIndex": 232
        },
        "name": "whoosh"
      }
    ],
    "metadata": {
      "beatNumber": 30,
      "objective": "Outro signature Golden Gab"
    }
  }
],
};
