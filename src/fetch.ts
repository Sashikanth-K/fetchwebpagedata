function fetch(url?: String): any {
  // ...

  if (!url) return null;
  return {
    assets: [],
    links: [],
  };
}

export default fetch;
