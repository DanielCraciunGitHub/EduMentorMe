export function nameToPath(name: string): string {
  return `/${name.toLowerCase().replaceAll(" ", "_")}`
}
export function capitalizeWords(str: string): string {
  const words = str.split("-")
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return capitalizedWords.join(" ")
}
export function getIsAdmin() {
  const data = localStorage.getItem("local") ?? null
  const parsedData = JSON.parse(data as string)
  return parsedData["is_admin"] ?? null
}
export function getName() {
  const data = localStorage.getItem("local") ?? null
  const parsedData = JSON.parse(data as string)
  return parsedData["name"] ?? null
}
