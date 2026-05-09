module.exports = function(eleventyConfig) {

  // Pass through these folders/files unchanged
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("recover");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Blog posts collection (newest first)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").reverse();
  });

  // Format date nicely e.g. "9 May 2025"
  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric"
    });
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
