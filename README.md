# 피그마 플러그인 실습

## 요구사항

- 글자 노드를 선택해 플러그인을 열면, 플로그인의 특정 단어로 텍스트를 대체한다.

## 기술

- 피그마 PLugin API
- Vite React-ts template

## 구조

- code.ts: sandbox code, 피그마와 직접 상호작용하거나, 데이터를 UI(iframe)과 주고받기 위함
- src/** : react UI code, 플러그인 UI
- manifest.json: 플러그인 메타 데이터, 소스 코드 경로 지정

### 이벤트 기반 iframe 통신

- sandbox에선 `figma.ui.onmessage`로 UI에 송수신할 메시지를 처리 
- UI에선 `window.addEventListener('message', handleMessage)`로 sandbox에 송수신할 메시지를 처리
- `apply-text`를 통해 UI에서 선택한 텍스트를 sandbox에 송신해 텍스트 대체

## 빌드

- 조금 난해했는데, ui는 정적자원을 서빙 못함. 따라서, `vite-plugin-singlefile`으로 html에 인라인으로 js와 css를 작성할 필요가 존재
- 문제는, `code.ts`가 `index.html(+ main.tsx)` 빌드 과정과 독립적으로 빌드돼야함, 하지만 vite는 rollup과 달리 multiple build input/output이 불가능함, 따라서 vite config를 분리함
- 같은 `outDir`에서 각 빌드 과정은 기본적으로(disable 가능) `outDir`를 지우고 빌드, 따라서 나중 빌드 프로세스가 이전 빌드 결과물을 다 지움
- 따라서, 각 빌드 프로세스 별로 다른 `outDir`을 설정하고 `dist`에서 병합하는 방식 사용 

## Digging?

- 개발환경과 프로덕션의 분리: figma dev는 realtime dev 환경을 제공, 환경변수따라 manifest를 다르게 정하는 방법 존재할듯
- 프레임, 그룹에 대해 언어를 설정하면 모두 바꿔주는 기능(단, 텍스트 테이블은 disable)
- 실제 환경에선 리소스를 불러오는 시간이 길지 않을까?
- 빌드 프로세스에 대한 정답?
