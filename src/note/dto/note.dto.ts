import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsObjectId } from '../../validation/custom/custom.class.validator.decorators';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

export class UpdateNoteDto {
  @IsObjectId({
    message: 'Note id should be a valid object id',
  })
  @IsNotEmpty()
  noteId: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  content: string;
}

export class DeleteNoteDto {
  @IsObjectId({
    message: 'Note id should be a valid object id',
  })
  @IsNotEmpty()
  noteId: string;
}
