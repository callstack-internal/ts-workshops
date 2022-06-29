export interface Top250Data {
  items: Top250DataDetail[];
  errorMessage: string;
}

export interface Top250DataDetail {
  id: string;
  rank: string;
  title: string;
  fullTitle: string;
  year: string;
  image: string;
  crew: string;
  imDbRating: string;
  imDbRatingCount: string;
}
