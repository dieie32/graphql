import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { Album } from './entities';
import { AlbumsService } from './albums.service';
import { CreateAlbumInput } from './dto';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(private readonly albumsService: AlbumsService) {}

  @Query(() => [Album], { name: 'albums' })
  findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Query(() => Album, { name: 'album' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Album> {
    return this.albumsService.findOne(id);
  }

  @Mutation(() => Album)
  createAlbum(@Args('createAlbumInput') createAlbumInput: CreateAlbumInput): Promise<Album> {
    return this.albumsService.create(createAlbumInput);
  }
}
