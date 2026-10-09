export const sfxManifest = {
  whoosh: {
    file: "audio/sfx/whoosh.mp3",
    alternateFile: "audio/sfx/whoosh.wav",
    volume: 0.28,
  },
  pop: {
    file: "audio/sfx/pop.mp3",
    alternateFile: "audio/sfx/pop.wav",
    volume: 0.32,
  },
  click: {
    file: "audio/sfx/click.mp3",
    alternateFile: "audio/sfx/click.wav",
    volume: 0.24,
  },
  ding: {
    file: "audio/sfx/ding.mp3",
    alternateFile: "audio/sfx/ding.wav",
    volume: 0.3,
  },
  error: {
    file: "audio/sfx/error.mp3",
    alternateFile: "audio/sfx/error.wav",
    volume: 0.28,
  },
  swipe: {
    file: "audio/sfx/swipe.mp3",
    alternateFile: "audio/sfx/swipe.wav",
    volume: 0.25,
  },
  typing: {
    file: "audio/sfx/typing.mp3",
    alternateFile: "audio/sfx/typing.wav",
    volume: 0.2,
  },
  riser: {
    file: "audio/sfx/riser.mp3",
    alternateFile: "audio/sfx/riser.wav",
    volume: 0.24,
  },
} as const;

export type SfxName = keyof typeof sfxManifest;

export const isSfxName = (name: string): name is SfxName =>
  Object.prototype.hasOwnProperty.call(sfxManifest, name);
