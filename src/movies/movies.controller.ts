import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  //서비스 설정
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  //서칭 부분이 /Id 부분 보다 아래에 있으면 /:id를 바라보고 search으로 가지 못한다.
  @Get('search')
  search(@Query('year') searchingYear) {
    return 'we are searching for movie with year ' + searchingYear;
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    //GET의 :id는 @param의 id 와 같아야 한다.
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    //request 안의 Body를 가져오기 위함
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.updateMovie(movieId, updateData);
  }
}
