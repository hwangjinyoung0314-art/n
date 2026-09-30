# VOIR, VODA

2026-09-30 작업 중인 화이트 미니멀 갤러리 시안 백업입니다. 사진·제목·날짜는 자리표시이며 CMS는 아직 연결되지 않았습니다. 브라우저 화면과 빌드는 아직 검증하지 않았습니다.

## 필수: 폰트 추가
원본 프로젝트 zip에서 `voirvoda/public/fonts/HSBombaram2.1.ttf`를 꺼내 이 저장소의 `public/fonts/` 폴더에 올리세요. GitHub에서 해당 폴더를 열고 Add file → Upload files → Commit changes를 선택합니다. 폰트가 없으면 기본 serif 글꼴로 표시됩니다. 바이너리 폰트는 이번 백업에 포함되지 않았습니다.

## Cloudflare Pages 연결
1. Pages에서 Git 저장소 연결 방식으로 이 저장소 `n`을 선택합니다.
2. 프로덕션 브랜치: `main`
3. 루트 디렉터리: 저장소 루트(비워 둠)
4. 빌드 명령: `npm run build`
5. 빌드 출력 디렉터리: `dist`
6. Node 버전 환경변수: `NODE_VERSION=22.12.0`
7. 저장하고 배포합니다. 연결 후 main 커밋으로 자동 배포됩니다.

## 로컬 실행
Node 22.12 이상에서 `npm install`, `npm run dev`를 실행합니다. 배포 빌드는 `npm run build`, 확인은 `npm run preview`입니다.

## 다음 작업
실제 작품 교체와 CMS 연동은 추후 진행합니다. 현재는 index.html에 카드 3개가 직접 작성되어 있습니다. Sanity 설정 및 자동 작품 업로드 기능은 구현하지 않았습니다.
