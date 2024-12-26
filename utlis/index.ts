export function getStoryStyles(index: number) {
  // Indices that should use the dark theme
  const darkThemeIndices = [1, 2, 6, 9, 11, 13, 17, 19];

  if (darkThemeIndices.includes(index)) {
    return {
      bgColor: "rgba(255, 255, 255, 0.1)",
      primaryColor: "#FFFFFF",
      secondaryColor: "#505050",
      buttonBg: "rgba(255, 255, 255, 0.1)",
      buttonIconColor: "#FFFFFF",
    };
  }

  return {
    bgColor: "rgba(194, 191, 178, 0.1)",
    primaryColor: "#0F0F0F",
    secondaryColor: "rgba(17, 17, 17, 0.5)",
    buttonBg: "rgba(194, 191, 178, 0.1)",
    buttonIconColor: "#0F0F0F",
  };
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};
