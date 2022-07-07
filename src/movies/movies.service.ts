import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      //NestJS가 제공하는 예외에러
      throw new NotFoundException(`Movie with ID ${id} is not found`);
    }
    return movie;
  }

  //불리언 반환이기에 true 반환
  deleteOne(id: number): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: number, updateData: UpdateMovieDTO): Movie {
    const movie = this.getOne(id);
    this.deleteOne(id);
    const newMovie = { ...movie, ...updateData };
    this.movies.push(newMovie);

    return newMovie;
  }
}
