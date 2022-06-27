import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ResponseInterface } from 'src/constants/interfaces/response.interface';
import { CreateNoteDto, DeleteNoteDto, UpdateNoteDto } from './dto/note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  async findAll(): Promise<ResponseInterface> {
    return this.noteService.findAll();
  }

  @Post()
  async create(@Body() note: CreateNoteDto): Promise<ResponseInterface> {
    return await this.noteService.create(note);
  }

  @Put()
  async update(@Body() note: UpdateNoteDto): Promise<ResponseInterface> {
    return await this.noteService.update(note);
  }

  @Delete()
  async delete(@Body() note: DeleteNoteDto): Promise<ResponseInterface> {
    return await this.noteService.delete(note);
  }
}
