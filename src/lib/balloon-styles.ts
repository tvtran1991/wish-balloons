export interface BalloonStyle {
  id: number;
  name: string;
  bodyColor: string;
  accentColor: string;
  glowColor: string;
}

export const BALLOON_STYLES: BalloonStyle[] = [
  {
    id: 1,
    name: "Sky Blue",
    bodyColor: "#93c5fd",
    accentColor: "#bfdbfe",
    glowColor: "#dbeafe",
  },
  {
    id: 2,
    name: "Rose Pink",
    bodyColor: "#f9a8d4",
    accentColor: "#fbcfe8",
    glowColor: "#fce7f3",
  },
  {
    id: 3,
    name: "Soft Purple",
    bodyColor: "#c4b5fd",
    accentColor: "#ddd6fe",
    glowColor: "#ede9fe",
  },
  {
    id: 4,
    name: "Mint Green",
    bodyColor: "#86efac",
    accentColor: "#bbf7d0",
    glowColor: "#dcfce7",
  },
  {
    id: 5,
    name: "Sunny Yellow",
    bodyColor: "#fde047",
    accentColor: "#fef08a",
    glowColor: "#fef9c3",
  },
];

export function getBalloonStyle(id: number): BalloonStyle {
  return BALLOON_STYLES.find((s) => s.id === id) ?? BALLOON_STYLES[0];
}
