import { gql } from 'apollo-angular';

export const UPDATE_ALBUM = gql`
  mutation UpdateAlbum($updateAlbumInput: UpdateAlbumInput!) {
    updateAlbum(updateAlbumInput: $updateAlbumInput) {
      id
      title
      url
    }
  }
`;
