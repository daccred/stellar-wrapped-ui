export function getStoryStyles(index: number) {
  // Indices that should use the dark theme
  const darkThemeIndices = [1, 2, 6, 8, 10, 12, 16, 18];

  if (darkThemeIndices.includes(index)) {
    return {
      counterBg: "bg-white/10",
      counterTextPrimary: "text-white",
      counterTextSecondary: "text-muted-foreground",
    };
  }

  return {
    counterBg: "bg-muted/10",
    counterTextPrimary: "text-muted",
    counterTextSecondary: "text-[#111111]/50",
  };
}
