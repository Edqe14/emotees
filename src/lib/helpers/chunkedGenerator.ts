function* chunkedGenerator<T>(arr: T[], chunkSize: number): Generator<T[], void, void> {
  for (let i = 0; i < arr.length; i += chunkSize) {
    yield arr.slice(i, i + chunkSize);
  }
};

export default chunkedGenerator;