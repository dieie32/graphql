import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Album } from './entities';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  providers: [AlbumsResolver, AlbumsService],
})
export class AlbumsModule {}
