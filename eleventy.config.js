module.exports = function(eleventyConfig) {
  // Pass through these files/folders completely unchanged
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("recover");
  // Map public/images → images so CMS paths (/images/x.jpg) work correctly
  eleventyConfig.addPassthroughCopy({"public/images": "images"});
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("affiliate-disclosure");
  eleventyConfig.addPassthroughCopy("privacy-policy");
  eleventyConfig.addPassthroughCopy("terms");
  eleventyConfig.addPassthroughCopy("cookie-policy");
  eleventyConfig.addPassthroughCopy("tools");
  // Blog posts collection (newest first)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").reverse();
  });
  // Format date e.g. "9 May 2025"
  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric"
    });
  });
  // ISO 8601 date for sitemap e.g. "2026-05-12"
  eleventyConfig.addFilter("isoDate", function(date) {
    return new Date(date).toISOString().split('T')[0];
  });
  // Estimate reading time
  eleventyConfig.addFilter("readingTime", function(content) {
    const words = String(content).split(/\s+/).length;
    const mins = Math.ceil(words / 200);
    return mins + " min read";
  });
  return {
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes"
    }
  };
};
