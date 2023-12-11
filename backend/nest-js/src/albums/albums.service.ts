import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Album } from './entities';
import { CreateAlbumInput, UpdateAlbumInput } from './dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private albumsRepository: Repository<Album>) {}

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id): Promise<Album> {
    return this.albumsRepository.findOneOrFail({ where: { id } });
  }

  async create(createAlbumInput: CreateAlbumInput): Promise<Album> {
    await new Promise((resolve) => {
      resolve(null);
    });
    return this.albumsRepository.save({ ...createAlbumInput });
  }

  async update(id, updateAlbumInput: UpdateAlbumInput): Promise<Album> {
    const album = await this.albumsRepository.findOne({ where: { id } });
    return this.albumsRepository.save({ ...album, ...updateAlbumInput });
  }

  async remove(id): Promise<Album> {
    const album = await this.albumsRepository.findOne({ where: { id } });
    await pubSub.publish('albumDeleted', { albumDeleted: album });
    await this.albumsRepository.remove(album);

    return { ...album, id };
  }
}
