import { extract } from "./extract";
import { FetchError, ExtractionError } from "./errors";
import { FetchResult, isValidUrl } from "./helpers";
import getPageData from "./helpers";

// fetches the page data and extracts the assets and links from it

/**
 * @param {string} url
 * @returns {Promise<FetchResult>}
 * @throws {FetchError}
 * @throws {ExtractionError}
 * @throws {Error}
 */

async function fetch(url: string): Promise<FetchResult> {
  try {

    // check if the string is valid url or not 
    if (!isValidUrl(url)) {
      throw new Error("Provided string is not a valid URL");
    }
    // get the page data in html format 
    const html = await getPageData(url);

    // extract the assets and links from the html using extract function
    const { assets, links } = extract(html);

    
    return { assets, links };
  } catch (error) {

    // if the error is of type FetchError or ExtractionError then 
    // throw the error again so that the developer can handle it 
    if (error instanceof FetchError || error instanceof ExtractionError) {
      throw error;
    } else {
      throw error;
    }
  }
}

export default fetch;
