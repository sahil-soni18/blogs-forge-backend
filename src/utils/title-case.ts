// Helper function to clean and format strings
export function toTitleCase(str: string): string {
  return (
    str
      // Replace _, /, - with spaces
      .replace(/[_\\/-]/g, ' ')
      // Trim and remove duplicate spaces
      .trim()
      .replace(/\s+/g, ' ')
      // Convert to Title Case
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      )
  );
}
