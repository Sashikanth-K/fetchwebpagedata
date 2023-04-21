// Error classes for the crawler
class FetchError extends Error {
  type: string;

  constructor(message: string, type: string) {
    super(message);
    this.name = "FetchError";
    this.type = type;
  }
}

// Error class for all the errors that are related to extracting the assets and links from the html
class ExtractionError extends Error {
  type: string;

  constructor(message: string) {
    super(message);
    this.name = "ExtractionError";
  }
}

class AssetExtractionError extends ExtractionError {
  constructor(message: string) {
    super(message);
    this.name = "AssetExtractionError";
  }
}

class LinkExtractionError extends ExtractionError {
  constructor(message: string) {
    super(message);
    this.name = "LinkExtractionError";
  }
}

export {
  FetchError,
  ExtractionError,
  AssetExtractionError,
  LinkExtractionError,
};
