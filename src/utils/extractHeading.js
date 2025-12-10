// utils/extractHeading.js
export const extractHeading = (html = "") => {
  if (!html) return null;

  const headingMatch =
    html.match(/<h1[^>]*>(.*?)<\/h1>/i) ||
    html.match(/<h2[^>]*>(.*?)<\/h2>/i) ||
    html.match(/<h3[^>]*>(.*?)<\/h3>/i);

  return headingMatch?.[1]?.trim() || null;
};
