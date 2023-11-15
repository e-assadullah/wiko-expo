export type TSeverity = "success" | "error" | "info";

export const getSeverity = (severity: TSeverity) => {
  switch (severity) {
    case "success":
      return "#3fa34d";
    case "error":
      return "#f21b3f";
    case "info":
      return "#ffd449";
  }
};
