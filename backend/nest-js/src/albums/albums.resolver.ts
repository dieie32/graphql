import { Resolver, Query, Args, Int, Mutation, Subscription } from '@nestjs/graphql';

import { Album } from './entities';
import { AlbumsService } from './albums.service';
import {CreateAlbumInput, UpdateAlbumInput} from './dto';
import { PubSub } from 'graphql-subscriptions';
import {Post} from "../posts/entities";
import {UpdatePostInput} from "../posts/dto";

const pubSub = new PubSub();

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

  @Mutation(() => Album)
  updateAlbum(@Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput): Promise<Album> {
    return this.albumsService.update(updateAlbumInput.id, updateAlbumInput);
  }

  @Mutation(() => Album)
  removeAlbum(@Args('id', { type: () => Int }) id: number): Promise<Album> {
    return this.albumsService.remove(id);
  }

  @Subscription(() => Album)
  albumDeleted() {
    return pubSub.asyncIterator('albumDeleted');
  }
}
