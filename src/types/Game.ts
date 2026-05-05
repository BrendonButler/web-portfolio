export default interface Game {
  slug: string;
  title: string;
  shortDescription: string;
  engine: string;
  version: string;
  embedPath: string;
  aspectRatio: string;
  controls: string[];
  releaseDate: string;
}
