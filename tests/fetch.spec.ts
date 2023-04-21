import axios from "axios";
import { FetchError, ExtractionError } from "../src/errors";
import fetch from "../src/fetch";

jest.mock("axios");

describe("fetch module", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should fetch the given URL and return assets and links from the HTML", async () => {
    const url = "https://example.com";
    const responseData = `
      <html>
        <body>
          <img src="image1.jpg" />
          <img src="image2.png" />
          <a href="https://example.com/page1">Page 1</a>
          <a href="https://example.com/page2">Page 2</a>
        </body>
      </html>
    `;

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: responseData,
    });

    const { assets, links } = await fetch(url);

    expect(assets).toEqual(["image1.jpg", "image2.png"]);
    expect(links).toEqual([
      "https://example.com/page1",
      "https://example.com/page2",
    ]);
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  test('should return empty arrays if no assets or links are found in the HTML', async () => {
    const url = 'https://example.com';
    const responseData = `
      <html>
        <body>
          <p>There are no images or links in this HTML</p>
        </body>
      </html>
    `;

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: responseData });

    const { assets, links } = await fetch(url);

    expect(assets).toEqual([]);
    expect(links).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  test("should throw FetchError when fetching the URL fails", async () => {
    const url = "https://example.com";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      response: { status: 404 },
    });

    await expect(fetch(url)).rejects.toThrowError(FetchError);
  });

  
  test("should throw Custom error when unknown error occurs ", async () => {
    const url = "";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      request: {},
    });

    await expect(fetch(url)).rejects.toThrowError();
  });
});
