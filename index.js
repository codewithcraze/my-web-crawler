const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');
const fs = require('fs');

class WebCrawler {
  constructor(startUrl, delayMs = 50, limit = 50) {
    this.startUrl = startUrl;
    this.delayMs = delayMs;
    this.limit = limit;
    this.visitedUrls = new Set();
  }

  // A delay function
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // Function to crawl a URL
  async crawl(url) {
    if (this.visitedUrls.has(url)) {
      return;  // Skip if already visited
    }
    if(this.visitedUrls.size === this.limit){
      console.log("Limit reached, stopping crawling");
      return;

    }
    // Mark the URL as visited
    this.visitedUrls.add(url);
    console.log(`Crawling URL: ${url}`);

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const links = $('a[href]').map((i, el) => {
        const href = $(el).attr('href');
        return href;
      }).get();
      // Resolve and follow internal links
      for (const link of links) {
        const fullUrl = new URL(link, url).href;
        if (fullUrl.startsWith(this.startUrl) && !this.visitedUrls.has(fullUrl)) {
          console.log(`Found internal link: ${fullUrl}`);
          await this.crawl(fullUrl);  // Recursively crawl the link
        }
      }
    } catch (error) {
      console.error(`Error crawling ${url}: ${error.message}`);
    }
    await this.delay(this.delayMs);
  }
  // Generate XML sitemap
  generateSitemap() {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const xmlFooter = '</urlset>';
    const xmlUrls = Array.from(this.visitedUrls).map(url => {
      return `  <url>\n    <loc>${url}</loc>\n  </url>`;
    }).join('\n');
    return xmlHeader + xmlUrls + '\n' + xmlFooter;
  }
  // Save the sitemap to a file
  saveSitemap(filename) {
    const sitemapXml = this.generateSitemap();
    fs.writeFileSync(filename, sitemapXml, 'utf-8');
    console.log(`Sitemap saved to ${filename}`);
  }
}

module.exports = WebCrawler;
