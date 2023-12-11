import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAlbumInput } from './create-album.input';

@InputType()
export class UpdateAlbumInput extends PartialType(CreateAlbumInput) {
  @Field(() => Int)
  id: number;
}
