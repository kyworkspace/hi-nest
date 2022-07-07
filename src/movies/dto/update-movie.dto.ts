import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDTO } from './create-movie.dto';

//update는 있어도 되고 없어도 되니깐 ?로 nullable
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
//PartialType은 베이스로 사용할 DTO가 필요하다.
