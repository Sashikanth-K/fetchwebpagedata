import { JSDOM } from "jsdom";

import {
  AssetExtractionError,
  LinkExtractionError,
  ExtractionError,
} from "./errors";
// result interface
import { FetchResult } from "./helpers";

// Here with the help of JSDOM we are parsing the html string and extracting the assets and links from the DOM instance
// it constructs. Usually web browsers does not throw any error when the html is invalid
// so JSDOM (and other headless browser libraries as well) does the same.
// So we rarely get any error while extracting the assets and links from the html.

// extractAssets function is used to extract the assets from the html
function extractAssets(document: any): string[] {
  try {
    const imgElements = document.querySelectorAll("img");
    const assets = Array.from(imgElements).map(
      (img: any) => img.getAttribute("src") || ""
    );
    return assets.filter((src) => src.length > 0);
  } catch (error) {
    throw new AssetExtractionError(
      "Failed to extract assets from the document"
    );
  }
}

// extractLinks function is used to extract the links from the html
function extractLinks(document: any): string[] {
  try {
    const aElements = document.querySelectorAll("a");
    const links = Array.from(aElements).map(
      (a: any) => a.getAttribute("href") || ""
    );
    return links.filter((href) => href.length > 0);
  } catch (error) {
    throw new LinkExtractionError("Failed to extract links from the document");
  }
}

// extract function is used to extract the assets and links from the html
function extract(html: string): FetchResult {
  try {
    // create a new JSDOM instance using the given html string
    const dom = new JSDOM(html);
    // get the document from the JSDOM instance
    const document = dom.window.document;

    // extractAssets and extractLinks are helper functions that are used by the extract function
    const assets = extractAssets(document);
    const links = extractLinks(document);
    return { assets, links };
  } catch (error) {
    if (error instanceof ExtractionError) {
      throw error;
    } else {
      throw new Error("Failed to parse the HTML content");
    }
  }
}

export { extract, extractAssets, extractLinks };
