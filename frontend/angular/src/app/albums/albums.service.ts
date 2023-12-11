import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import { Album, AlbumParams } from 'src/app/albums/models';
import {Apollo} from "apollo-angular";
import {ALBUMS} from "./graphql/query-albums";
import {CREATE_ALBUM} from "./graphql/mutation-create-album";
import {REMOVE_ALBUM} from "./graphql/mutation-remove-album";
import {UPDATE_ALBUM} from "./graphql/mutation-update-album";

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(private apollo: Apollo) {}

  queryAlbums(): Observable<Album[]> {
    return this.apollo
      .watchQuery<{ albums: Album[] }>({
        query: ALBUMS,
      })
      .valueChanges.pipe(map(({ data }) => data?.albums));
  }

  createAlbum(albumParams: AlbumParams): Observable<Album | undefined> {
    return this.apollo
      .mutate<{ __typename: string; createAlbum: Album }>({
        mutation: CREATE_ALBUM,
        variables: {
          createAlbum: { ...albumParams },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createAlbum: {
            __typename: "Album",
            id: Math.round(Math.random() * -1000000),
            ...albumParams,
          },
        },
        update: (cache, { data }) => {
          const list = cache.readQuery<{ albums: Album[] }>({ query: ALBUMS });
          cache.writeQuery({
            query: ALBUMS,
            data: { albums: [data?.createAlbum, ...list!.albums] },
          });
        },
      })
      .pipe(map(({ data }) => data?.createAlbum));
  }

  updateAlbum(id: number, albumParams: AlbumParams): Observable<Album | undefined> {
    return this.apollo
      .mutate<{ updateAlbum: Album }>({
        mutation: UPDATE_ALBUM,
        variables: {
          updateAlbumInput: { id, ...albumParams },
        },
      })
      .pipe(map(({ data }) => data?.updateAlbum));
  }

  removeAlbum(id: number): Observable<Album | undefined> {
    return this.apollo
      .mutate<{ removeAlbum: Album }>({
        mutation: REMOVE_ALBUM,
        variables: { id },
        update: (cache) => {
          const normalizedId = cache.identify({ id, __typename: 'Album' });
          cache.evict({ id: normalizedId });
          cache.gc();
        },
      })
      .pipe(map(({ data }) => data?.removeAlbum));
  }
}
