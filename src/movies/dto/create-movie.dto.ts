import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;

  @IsOptional() //nullable이라는 의미
  @IsString({ each: true }) //배열의 개별요소를 검사함
  readonly genres: string[];
}
