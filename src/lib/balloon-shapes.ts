export interface BalloonShape {
  id: number;
  name: string;
  emoji: string;
  svgPath: string;
}

// 12 Vietnamese zodiac animals, each a simplified silhouette in a 40×40 viewBox
export const BALLOON_SHAPES: BalloonShape[] = [
  {
    id: 1,
    name: "Rat",
    emoji: "\u{1F400}",
    // Round body, round ears, long tail curving right
    svgPath:
      "M16 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm8-1a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM20 16c-6 0-11 3-11 8s3 9 11 9 11-4 11-9-5-8-11-8Zm11 14c2 2 6 4 8 2",
  },
  {
    id: 2,
    name: "Buffalo",
    emoji: "\u{1F403}",
    // Stocky body with curved horns
    svgPath:
      "M8 10c-3-4-7-3-7 0s3 4 5 2M32 10c3-4 7-3 7 0s-3 4-5 2M12 14c-4 3-6 8-5 13 1 4 5 7 13 7s12-3 13-7c1-5-1-10-5-13-3-2-6-3-8-3s-5 1-8 3Z",
  },
  {
    id: 3,
    name: "Tiger",
    emoji: "\u{1F405}",
    // Cat-like head with pointed ears, strong body
    svgPath:
      "M10 6l-2-5 6 3Zm20 0l2-5-6 3ZM20 8c-8 0-13 5-13 12 0 5 2 9 5 11 2 2 5 3 8 3s6-1 8-3c3-2 5-6 5-11 0-7-5-12-13-12Zm-4 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-8 4c-2 0-3 1-3 2h6c0-1-1-2-3-2Z",
  },
  {
    id: 4,
    name: "Cat",
    emoji: "\u{1F408}",
    // Sitting cat with pointed ears and curved tail
    svgPath:
      "M12 5l-4-4v6Zm16 0l4-4v6ZM20 8c-7 0-12 4-12 11 0 5 3 9 6 11 2 1 4 2 6 2s4-1 6-2c3-2 6-6 6-11 0-7-5-11-12-11Zm-3 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm9 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-6 3l-2 2h4l-2-2Z",
  },
  {
    id: 5,
    name: "Dragon",
    emoji: "\u{1F409}",
    // Serpentine body with horns and whiskers
    svgPath:
      "M10 4l-3-2 1 4Zm20 0l3-2-1 4ZM20 6c-9 0-14 5-14 12 0 4 2 7 5 9l-4 6h5l2-4c2 1 4 1 6 1s4 0 6-1l2 4h5l-4-6c3-2 5-5 5-9 0-7-5-12-14-12Zm-4 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  },
  {
    id: 6,
    name: "Snake",
    emoji: "\u{1F40D}",
    // Coiled serpentine shape
    svgPath:
      "M20 4c-8 0-14 4-14 10 0 4 3 8 8 9-1 2-1 4 0 6 1 3 4 5 6 5 3 0 5-2 6-5 1-2 1-4 0-6 5-1 8-5 8-9 0-6-6-10-14-10Zm-3 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-5 3c0 1-1 2-2 2s-2-1-2-2",
  },
  {
    id: 7,
    name: "Horse",
    emoji: "\u{1F40E}",
    // Horse head profile with mane
    svgPath:
      "M14 4c-2 0-3 2-3 4l-3 1c-1 1-1 3 0 4l3 1c1 4 5 8 9 9v6h3v-6h4v6h3v-7c3-2 5-6 5-10 0-5-4-8-9-8l-1-3c-1-2-3-2-4 0l-1 3h-6Zm1 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  },
  {
    id: 8,
    name: "Goat",
    emoji: "\u{1F410}",
    // Goat with curved horns
    svgPath:
      "M11 3c-2-1-4 1-3 3l3 4Zm18 0c2-1 4 1 3 3l-3 4ZM20 10c-7 0-12 4-12 10 0 4 2 7 5 9v5h4v-4c1 0 2 1 3 1s2-1 3-1v4h4v-5c3-2 5-5 5-9 0-6-5-10-12-10Zm-3 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  },
  {
    id: 9,
    name: "Monkey",
    emoji: "\u{1F412}",
    // Round face with large ears
    svgPath:
      "M8 16a4 4 0 1 1-4-4 10 10 0 0 1 4 4Zm28 0a4 4 0 1 0 4-4 10 10 0 0 0-4 4ZM20 6c-8 0-13 5-13 12s5 13 13 13 13-6 13-13S28 6 20 6Zm-3 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-5 5c-2 0-4-1-4-2h8c0 1-2 2-4 2Z",
  },
  {
    id: 10,
    name: "Rooster",
    emoji: "\u{1F413}",
    // Rooster with comb and tail feathers
    svgPath:
      "M20 2c-1 0-2 1-2 3h4c0-2-1-3-2-3Zm0 5c-7 0-12 4-12 11 0 4 2 7 5 9v5h4v-4h6v4h4v-5c3-2 5-5 5-9 0-7-5-11-12-11Zm-3 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-7 4l2 2 2-2h-4Z",
  },
  {
    id: 11,
    name: "Dog",
    emoji: "\u{1F415}",
    // Dog with floppy ears
    svgPath:
      "M9 8C7 4 3 5 3 9c0 3 2 5 4 5l2-1ZM31 8c2-4 6-3 6 1 0 3-2 5-4 5l-2-1ZM20 8c-7 0-12 5-12 11 0 5 3 8 6 10v5h4v-4c1 0 1 0 2 0s1 0 2 0v4h4v-5c3-2 6-5 6-10 0-6-5-11-12-11Zm-3 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-5 3c-1 0-2 1-2 2h4c0-1-1-2-2-2Z",
  },
  {
    id: 12,
    name: "Pig",
    emoji: "\u{1F416}",
    // Round piggy with snout and ears
    svgPath:
      "M10 7c-2-2-5-1-5 2l3 3Zm20 0c2-2 5-1 5 2l-3 3ZM20 8c-8 0-14 5-14 12s6 12 14 12 14-5 14-12S28 8 20 8Zm-4 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-4 4c0 1-2 2-4 2s-4-1-4-2a4 4 0 0 1 8 0Z",
  },
];

export function getBalloonShape(id: number): BalloonShape | null {
  if (id === 0) return null;
  return BALLOON_SHAPES.find((s) => s.id === id) ?? null;
}
