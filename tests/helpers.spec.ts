import getPageData, { isValidUrl } from "../src/helpers";
import axios from "axios";
import { FetchError } from "../src/errors";

jest.mock("axios");

describe("getPageData function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should fetch the given URL and return the response data", async () => {
    const url = "https://uplearn.com";
    const responseData = "<html><body>Sample HTML</body></html>";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: responseData,
    });

    const data = await getPageData(url);

    expect(data).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  test("should throw FetchError with code FETCH_ERROR when fetching the URL fails", async () => {
    const url = "https://uplearn.com";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue({
      response: { status: 404 },
    });

    await expect(getPageData(url)).rejects.toThrowError(FetchError);
    await expect(getPageData(url)).rejects.toHaveProperty("type");
    await expect(getPageData(url)).rejects.toMatchObject({
      type: "FETCH_ERROR",
    });
  });

  test("should throw FetchError with code NETWORK_ERROR   when there is a network issue", async () => {
    const url = "https://uplearn.com";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      request: {},
    });

    await expect(getPageData(url)).rejects.toThrowError(FetchError);
  });

  test("should throw FetchError with code NETWORK_ERROR   when there is a network issue", async () => {
    const url = "https://uplearn.com";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error());

    await expect(getPageData(url)).rejects.toThrowError();
  });
});

describe("isValidUrl function", () => {
  test("validates a simple URL", () => {
    expect(isValidUrl("https://www.uplearn.com")).toBe(true);
  });

  test("validates a URL with a path", () => {
    expect(isValidUrl("https://www.uplearn.com/path")).toBe(true);
  });

  test("validates a URL with query parameters", () => {
    expect(isValidUrl("https://www.uplearn.com/path?key=value")).toBe(true);
  });

  test("validates a URL with a fragment identifier", () => {
    expect(isValidUrl("https://www.uplearn.com/path#fragment")).toBe(true);
  });

  test("validates a URL with a port number", () => {
    expect(isValidUrl("https://www.uplearn.com:8080")).toBe(true);
  });

  test("invalidates a string without a protocol", () => {
    expect(isValidUrl("www.uplearn.com")).toBe(false);
  });

  test("invalidates a string with an invalid url structure", () => {
    expect(isValidUrl("uplearn")).toBe(false);
  });

  test("invalidates a string with empty characters", () => {
    expect(isValidUrl("")).toBe(false);
  });
});
