import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    //테스트를 하기 전에 실행되는 부분
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      //getOne, delete , update 테스트를 위한 사전 작업
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
  });

  it('should be defined', () => {
    //it === indivisual Test의 줄임말
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      //service는 movieService로 매핑되어있다.
      const result = service.getAll();
      //getAll을 실행한 결과가 Array인지 테스트
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    //데이터를 가지고 테스트를 하기 때문에 가상의 데이터를 우선 1개 만들어서 확인해본다.

    it('shold return a movie', () => {
      const movie = service.getOne(1); //아이디는 위에서 만들면 어차피 1이기 때문이다.
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
        //999라는 영화는 없을테니 오류를 뱉어낼꺼임
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); //뱉어낸 오류가 낫파운드엑셉션인지 확인
        expect(e.message).toEqual('Movie with ID 999 is not found');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      const beforDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforDelete);
    });
    it('shoud return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); //뱉어낸 오류가 낫파운드엑셉션인지 확인
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const afterCrate = service.getAll().length;
      expect(afterCrate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.updateMovie(1, { title: 'Updated Test' });
      const movie = service.getOne(1);

      expect(movie.title).toEqual('Updated Test');
    });

    it('shoud throw a new NotFoundException', () => {
      try {
        service.updateMovie(999, { title: 'Updated Test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); //뱉어낸 오류가 낫파운드엑셉션인지 확인
      }
    });
  });
});
