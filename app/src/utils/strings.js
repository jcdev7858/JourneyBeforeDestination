export function capitalize(words) {
  // capitalize the first letter of each string
  if (!words) return "";
  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function snakify(words) {
  // convert the string to snake_case
  if (!words) return "";
  return words.toLowerCase().replaceAll(" ", "_");
}
