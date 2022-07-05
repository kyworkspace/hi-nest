import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'this will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    //GET의 :id는 @param의 id 와 같아야 한다.
    return `this will return one movie with the id : ${id}`;
  }

  @Post()
  create() {
    return 'this will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: String) {
    return `this will delete a movie with the movie Id ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `patch the movie with movie Id :${movieId}`;
  }
}
