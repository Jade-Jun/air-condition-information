# air-condition-information

## Summary
> 대기 상태 확인 API (실시간)
 - 6시간 간격으로 공공데이터 open api를 통해 데이터를 읽어 파일로 저장 
 - 각 시도를 기준으로 데이터를 가져옴 (중복데이터는 제거하고 최신데이터만 가져와 저장)
  

## Installation
> Node 설치 
 - 아래 링크를 통해 node 설치
 - mac os 유저일 경우 hombrew로 설치 가능 (brew install node)

> 필수 패키지 설치 (설치 패키지는 package.json 참조)
```
npm install
```

> pm2 (프로세스 관리도구) 설치
```
sudo npm install pm2 -g 
```

> 설정파일 추가
 - root 경로에 ecosystem.config.js 파일을 생성한다. 
 - [config format](https://github.com/Jade-Jun/atmospheric_information/wiki/config-format)을 복사하여 ecosystem.config.js 파일에 붙여넣는다.
 - SERVER_KEY 값에 공공데이터포털에서 발급받은 인증번호를 입력한다.

## Use
> 개발 모드
```
 npm run dev
```

> 상용 모드
```
npm run prod
```

> log 보기
```
npm run log
```

## Related projects
> * [Node](https://nodejs.org/ko/download/)
> * [homebrew](https://brew.sh/index_ko)
> * [공공데이터포털 대기오염 조회 서비스](https://www.data.go.kr/)


## API
> [API 문서는 이쪽을 참조]()
