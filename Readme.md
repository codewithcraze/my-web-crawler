# My Web Crawler

`my-web-crawler` is a simple, lightweight Node.js package for crawling websites and generating an XML sitemap. It recursively follows internal links, making it a useful tool for SEO analysis, website auditing, or content discovery.

## Features

- Recursively crawls internal links starting from a specified URL
- Generates an XML sitemap of all visited pages
- Rate-limiting to avoid overloading the target server
- Uses `axios` for HTTP requests and `cheerio` for parsing HTML

## Installation

To install the package, run:

```bash
npm install my-web-crawler
```

## Usage

### 1. Import the Web Crawler

After installing the package, you can import it into your project using either CommonJS or ES6 modules.

#### CommonJS Syntax

```javascript
const WebCrawler = require('my-web-crawler');
```

#### ES6 Modules Syntax

```javascript
import WebCrawler from 'my-web-crawler';
```

### 2. Crawling a Website

You can create a new instance of the `WebCrawler` class by providing the starting URL. The `crawl` method recursively crawls the site, and the `saveSitemap` method generates and saves the sitemap.

#### Example

```javascript
const WebCrawler = require('my-web-crawler');

// Specify the starting URL
const startUrl = 'http://codewithdeepak.in';
const crawler = new WebCrawler(startUrl);

// Start crawling and save the sitemap
crawler.crawl(startUrl).then(() => {
  crawler.saveSitemap('sitemap.xml');  // Saves the sitemap to 'sitemap.xml'
}).catch(err => {
  console.error('Error during crawl:', err);
});
```

### 3. Rate Limiting

The crawler includes a delay between requests to avoid overwhelming the target website. The delay is set to 50 milliseconds by default, but you can customize it when initializing the `WebCrawler`.

#### Example

```javascript
const crawler = new WebCrawler(startUrl, 100 , limit);  // Delay of 100 ms between requests
  // Set the limit of number of urls to crawl (optional)
```

## API

### WebCrawler Class

#### `constructor(startUrl, delayMs = 50, limit = 50)`
- **startUrl**: The URL to start crawling from.
- **delayMs**: Optional. The delay in milliseconds between requests (default is 50 ms).

#### `async crawl(url)`
Starts the crawling process. This method will recursively follow all internal links starting from the given URL.

- **url**: The URL to crawl.

#### `saveSitemap(filename)`
Generates an XML sitemap from the visited URLs and saves it to the specified file.

- **filename**: The file where the sitemap will be saved (e.g., `sitemap.xml`).

## Example Script

Here’s how you can use the package in a simple script:

```javascript
// crawler-script.js
const WebCrawler = require('my-web-crawler');

const startUrl = 'http://codewithdeepak.in';
const crawler = new WebCrawler(startUrl);

crawler.crawl(startUrl).then(() => {
  crawler.saveSitemap('sitemap.xml');
}).catch(err => {
  console.error('Error during crawl:', err);
});
```

To run the script:

```bash
node crawler-script.js
```

## Dependencies

- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for the browser and Node.js.
- [cheerio](https://www.npmjs.com/package/cheerio): Fast, flexible, and lean implementation of core jQuery designed specifically for the server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to contribute by submitting issues or pull requests. All contributions are welcome!

## Author

Created by [CodeWithCraze](https://github.com/codewithcraze).

---

### Summary:
This `README.md` file provides an overview of the package, installation instructions, usage examples, and API details. You can customize it further based on your specific requirements or additional features of the package.