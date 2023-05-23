# djs-v14-template
discord.js v14 템플릿

src 폴더 안에 `config.json` 생성
```json
{
  "token":"yourbottoken"
}
```
`CommandRegister.js` 안에 `clientId` `guildId` 입력


`npm i`로 라이브러리 다운로드

`npm run cr` 또는 `node CommandRegister`로 명령어 등록
`node index.js`로 실행하거나 `pm2 start index.js`로 실행하여 에러 시 자동 재시작
