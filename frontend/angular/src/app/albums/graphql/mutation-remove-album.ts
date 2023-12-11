import { gql } from 'apollo-angular';

export const REMOVE_ALBUM = gql`
  mutation RemoveAlbum($id: Int!) {
    removeAlbum(id: $id) {
      id
      title
      url
    }
  }
`;
