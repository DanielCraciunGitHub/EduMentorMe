export function nameToPath(name: string): string {
  return name.toLowerCase().replaceAll(" ", "_")
}
export function capitalizeWords(str: string): string {
  const words = str.split("-")
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return capitalizedWords.join(" ")
}
