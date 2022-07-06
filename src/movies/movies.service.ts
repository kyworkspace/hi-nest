import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getone(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  //불리언 반환이기에 true 반환
  deleteOne(id: string): boolean {
    const newMovies = this.movies.filter((movie) => movie.id !== +id);
    this.movies = newMovies;
    return true;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
