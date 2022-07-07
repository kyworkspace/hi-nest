## Nest JS Study

- nodeJS backend를 위한 프레임 워크
- 각종 기본 모듈을 설치 해줌

#### install

```
npm i -g @nestjs/cli
```

#### 명령어 확인

- 터미널에서

```
nest
```

실행

### Rules

- nestJS 는 main.ts를 가져야 한다.(바뀌면 안됨 수정불가)
- nestJS 는 데코레이터와 함께 한다.

```
@Module({
  ...
})
```

- 데코레이터는 클래스에 함수를 추가하는 기능을 한다. 클래스를 위해 움직인다고 보면 된다. (Spring의 어노테이션 같다.)
- 데코레이터는 꾸며주는 함수나 클래스랑 붙어있어야 한다. 데코레이터랑 함수사이에 빈칸 X
- main.ts => 모듈 => 컨트롤러 => 서비스 => Hello World!
- 터미널 명령어 generate로 많은 것을 생성할 수 있다.

#### AppModule

- AppModule은 모든 것의 루트 모듈 같은거

#### Controller

- 컨트롤러는 기본적으로 url를 가져오고 함수를 실행(리턴)함
- express의 라우터 같은 역할
- 생성

  ```
  PS C:\Projects\nest\hi-nest> nest g co
  ? What name would you like to use for the controller? movies
  ```

- @Controller('movies') 는 엔트리 포인트가 /movies 라는 뜻이다.

##### @Get @param

- HTTP Method의 GET의 Parameter를 알고 싶을때는 아래와 같이 작성한다.

```
@Get('/:id')
  getOne(@Param('id') id: string) {
    return `this will return one movie with the id : ${id}`;
  }
```

##### @Body

- request 로 보낸 Body를 확인하는 데코레이터 이다.

#### Service

```
nest g s
```

- 서비스를 만들면 자동으로 module 에서 임포트 한다.
- 서비스는 Single-responsiblility principle 을 따른다.
- NestJS는 url와 비즈니스 로직을 분리한다.
- controller는 그냥 url를 가져오는 역할
- 그외 나머지는 service 에서 처리(spring 같은데?)
- 통상적으로 컨트롤러에서 짓는 함수명을 그대로 서비스로 가져가지만 꼭 그럴필욘 없다.

##### Single-responsiblility principle

- 하나의 모듈 또는 클래스에서는 한개의 function을 관리한다.

#### Exception

- spring과 비슷하게 NestJS가 기본적으로 제공하는 HttpException들이 여럿있다. NotFoundException.. 등등

#### validation

- Dto 타입을 만들어서 각각에 들어오거나 나오는 데이터를 검증할수 있도록 한다.
- DTO는 NEST JS가 들어오는 쿼리에 대해 유효성을 검사할 수 있도록 해준다.

#### class-validator, class-transformer 설치

```
npm i class-validator, class-transformer
```

- validation pipe를 위한 라이브러리이다.

#### PartialType

```
npm i @nestjs/mapped-types
```

- 타입을 변환시키고 사용할 수 있게하는 패키지
- NestJs 같은 제작이다.

#### 모듈 분리

```
PS C:\Projects\nest\hi-nest> nest g mo
? What name would you like to use for the module? movies
```

- app.module에는 AppController와 AppService만 있어야 한다.
- 각각의 모듈을 독립시키고 분리하기 위해서 각 컨트롤러,서비스를 위한 모듈을 만든다.
- app.module이 movie.module을 임포트 하는 방식으로 한다.

#### Access express

- 각 컨트롤러에서 파라미터로 넘어노는 것을 @Req, @Res로 정의한다.

```
@Get()
  getAll(@Req() req, @Res() res): Movie[] {
    return this.moviesService.getAll();
  }
```

- NestJS는 express 위에서 돌아가기 때문에 위와같이 파라미터를 정의하면 express에 접근할 수 있다.
- req,res에 직접 접근하는 방식은 추천하지 않는다.
- fastify와 express를 같이 사용한기 때문에 각각의 방식에서만 사용되는 (ex. res.json({~~~})) 방식은 두개의 프레임워크 사이에서 간극이 될 수도 있다.
- 진짜 필요한 경우말고는 사용을 피하자

### Test

- nestjs는 기본적으로 jest가 딸려오면서 package.json에서 test준비가 되어있다.
- 유닛 테스트는 function 하나만 테스트 해볼때 사용한다.
- e2e(end-to-end) 테스트는 특정 링크로 가면 특정 페이지가 나와야하는 경우에 사용한다.
