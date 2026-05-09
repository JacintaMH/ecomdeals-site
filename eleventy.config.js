module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("recover");
  eleventyConfig.addPassthroughCopy({"public/images": "images"});
  eleventyConfig.addPassthroughCopy("deals.html");
  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").reverse();
  });

  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric"
    });
  });

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
