module.exports = function(eleventyConfig) {

  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("public");

  // Pass through the main deals page as-is
  eleventyConfig.addPassthroughCopy("index.html");

  // Make posts available as a collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").reverse();
  });

  // Date filter for templates
  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  });

  // Reading time filter
  eleventyConfig.addFilter("readingTime", function(content) {
    const words = String(content).split(/\s+/).length;
    const mins = Math.ceil(words / 200);
    return mins + " min read";
  });

  return {
    templateFormats: ["njk", "md", "html"],
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
