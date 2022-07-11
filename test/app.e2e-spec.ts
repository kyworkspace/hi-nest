import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //각 data type이 적합하지 않으면 애초에  validation에  들어오지 못함
        forbidNonWhitelisted: true,
        transform: true, // 유저들이 보낸 것을 원하는 실제타입으로 바꿔줌
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my movie API');
  });

  describe('/movies', () => {
    it('(GET)', () => {
      //app.getHttpServer() => http://localhost:3000~~~ 같은을 안쓰기 위한 방식
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    //post는 Movie를 보내줘야 정상 작동한다.
    it('(POST) 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });

    //상기에 지정한 PIPE에서 비정상적인 객체는 들어가지 않기 때문에 400를 리턴한다.
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
          other: 'thing',
        })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('Get 200 ', () => {
      //위에서 post로 create 테스트를 할때 1개를 만들기 때문에 하기의 테스트는 정상 통과한다.
      // 하지만 PIPE의 transform: true 부분때문에 1이 String 으로 들어가서 에러를 발생시킨다.
      //beforeAll에서 app 구동시 실행app과 동일한 파이프를 구성해주자
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'Updated TEST',
          year: 2020,
        })
        .expect(200);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
