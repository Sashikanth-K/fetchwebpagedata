import { extract } from "../src/extract";
import { describe, test, expect } from "@jest/globals";

describe("extract module", () => {
  test("should extract assets and links from the given HTML", () => {
    const html = `
      <html>
        <body>
          <img src="image1.jpg" />
          <img src="image2.png" />
          <a href="https://uplearn.com/page1">Page 1</a>
          <a href="https://uplearn.com/page2">Page 2</a>
        </body>
      </html>
    `;

    const { assets, links } = extract(html);

    expect(assets).toEqual(["image1.jpg", "image2.png"]);
    expect(links).toEqual([
      "https://uplearn.com/page1",
      "https://uplearn.com/page2",
    ]);
  });

  test("should return empty arrays if no assets or links are found", () => {
    const html = `
      <html>
        <body>
          <p>There are no images or links in this HTML</p>
        </body>
      </html>
    `;

    const { assets, links } = extract(html);

    expect(assets).toEqual([]);
    expect(links).toEqual([]);
  });
});
