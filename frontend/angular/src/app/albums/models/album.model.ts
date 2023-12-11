export interface Album {
  id: number;
  title: string;
  url: string;
  __typename?: "Album",
}

export interface AlbumParams {
  title: string;
  url: string;
}

export interface ConnectionInfo {
  page: number;
  pages: number;
  total: number;
}
