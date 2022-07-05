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

#### AppModule

- AppModule은 모든 것의 루트 모듈 같은거

#### Controller

- 컨트롤러는 기본적으로 url를 가져오고 함수를 실행(리턴)함
- express의 라우터 같은 역할

#### Service

- NestJS는 url와 비즈니스 로직을 분리한다.
- controller는 그냥 url를 가져오는 역할
- 그외 나머지는 service 에서 처리(spring 같은데?)
- 통상적으로 컨트롤러에서 짓는 함수명을 그대로 서비스로 가져가지만 꼭 그럴필욘 없다.
