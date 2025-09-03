export function stripHtmlTags(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, ""); // removes all HTML tags
}

export function slugify(str: string) {
  if (!str) return "";
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .trim() // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
}
