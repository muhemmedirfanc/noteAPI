import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateNoteDto, DeleteNoteDto, UpdateNoteDto } from './dto/note.dto';
import { ResponseInterface } from '../constants/interfaces/response.interface';
import { Note, NoteDocument } from 'src/Schemas/note/note.schema';

@Injectable()
export class NoteService {
  private readonly notes: CreateNoteDto[] = [];

  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async findAll(): Promise<ResponseInterface> {
    //get notes
    const notes = await this.noteModel.find(
      {},
      {
        noteId: '$_id',
        _id: 0,
        title: 1,
        content: 1,
      },
    );

    return {
      status: true,
      message: notes.length ? 'Notes found' : 'Notes are empty',
      data: { notes },
    };
  }

  async create(data: CreateNoteDto): Promise<ResponseInterface> {
    //save to db

    await new this.noteModel(data).save();

    return {
      status: true,
      message: 'Note created',
    };
  }

  async update(data: UpdateNoteDto): Promise<ResponseInterface> {
    const { noteId, title, content } = data;

    const updateNoteResponse = await this.noteModel.updateOne(
      {
        _id: noteId,
      },
      {
        title,
        content,
      },
    );

    return {
      status: true,
      message: updateNoteResponse.modifiedCount
        ? 'Note updated'
        : 'Note not updated',
    };
  }

  async delete(data: DeleteNoteDto): Promise<ResponseInterface> {
    const { noteId } = data;

    const deleteNoteResponse = await this.noteModel.deleteOne({
      _id: noteId,
    });

    return {
      status: true,
      message: deleteNoteResponse.deletedCount
        ? 'Note deleted'
        : 'Note not deleted',
    };
  }
}
