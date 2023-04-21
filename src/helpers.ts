import axios from "axios";
import { FetchError } from "./errors";

// fetches the page data from the given URL and returns it as a string
export default async function getPageData(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {

    // if the error is of type FetchError then throw the error again so that the developer can handle it
    if (error.response) {
      throw new FetchError(
        `Failed to fetch the URL, status code: ${error.response.status}`,
        "FETCH_ERROR"
      );
    } else if (error.request) {
      throw new FetchError(error.message, "NETWORK_ERROR");
    } else {
      throw error;
    }
  }
}

// checks if the given string is a valid URL or not
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// 
export interface FetchResult {
  assets: string[];
  links: string[];
}
