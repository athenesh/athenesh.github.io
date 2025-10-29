# GitHub Pages 정적 블로그

GitHub Pages를 활용한 마크다운 기반 정적 블로그입니다. 프레임워크 없이 순수 HTML, CSS, JavaScript로 구축되었습니다.

## ✨ 주요 기능

- 📝 **마크다운 지원**: Front Matter를 포함한 마크다운 파일로 게시글 작성
- 🎨 **다크/라이트 모드**: 사용자 선호에 따른 테마 전환
- 🔍 **검색 및 필터링**: 실시간 검색, 카테고리/태그 필터링
- 💬 **댓글 시스템**: Giscus를 활용한 GitHub Discussions 연동
- 🚀 **자동 배포**: GitHub Actions를 통한 자동 빌드 및 배포
- 📱 **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Markdown**: marked.js
- **Code Highlighting**: Prism.js
- **Comments**: Giscus
- **Deployment**: GitHub Pages + GitHub Actions

## 📁 프로젝트 구조

```
/
├── .nojekyll                 # Jekyll 비활성화
├── index.html               # 메인 페이지
├── post.html                # 게시글 상세 페이지
├── posts.json               # 게시글 메타데이터 (자동 생성)
├── css/
│   ├── style.css            # 메인 스타일
│   └── prism.css            # 코드 하이라이팅
├── js/
│   ├── app.js               # 메인 애플리케이션
│   ├── search.js            # 검색 기능
│   ├── post-loader.js       # 게시글 로딩
│   └── theme.js             # 테마 토글
├── pages/                   # 마크다운 게시글
│   ├── example.md
│   ├── javascript-tips.md
│   └── css-grid-guide.md
└── .github/
    ├── workflows/
    │   └── deploy.yml       # 배포 워크플로우
    └── scripts/
        └── generate-posts.js # posts.json 생성
```

## 🚀 시작하기

### 1. 저장소 포크 및 클론

```bash
# 이 저장소를 포크한 후 클론
git clone https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
cd YOUR_USERNAME.github.io
```

### 2. GitHub Pages 설정

1. 저장소 **Settings** > **Pages** 이동
2. **Source**를 "GitHub Actions"로 설정
3. **Discussions** 활성화 (댓글 기능을 위해)

### 3. Giscus 설정 (선택사항)

1. https://giscus.app/ko 접속
2. 저장소 정보 입력: `YOUR_USERNAME/YOUR_USERNAME.github.io`
3. 설정 완료 후 `js/post-loader.js`에서 다음 값들 업데이트:
   - `data-repo-id`
   - `data-category-id`

### 4. 게시글 작성

`pages/` 디렉토리에 마크다운 파일을 생성하세요:

```markdown
---
title: "게시글 제목"
date: 2025-01-26
tags: ["태그1", "태그2"]
category: "카테고리"
description: "게시글 설명"
---

# 제목

게시글 내용...
```

### 5. 배포

```bash
git add .
git commit -m "Add new post"
git push origin main
```

GitHub Actions가 자동으로 빌드하고 배포합니다.

## 📝 게시글 작성 가이드

### Front Matter 형식

```yaml
---
title: "게시글 제목" # 필수
date: 2025-01-26 # 필수 (YYYY-MM-DD 형식)
tags: ["태그1", "태그2"] # 선택사항
category: "카테고리" # 선택사항
description: "게시글 설명" # 선택사항
---
```

### 마크다운 문법

- **제목**: `#`, `##`, `###` 등 사용
- **강조**: `**굵게**`, `*기울임*`
- **코드**: `` `인라인 코드` ``, `코드 블록`
- **링크**: `[텍스트](URL)`
- **이미지**: `![alt](URL)`
- **목록**: `-` 또는 `1.` 사용

### 코드 하이라이팅

```javascript
// JavaScript 코드
function hello() {
  console.log("Hello, World!");
}
```

```css
/* CSS 코드 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

## 🎨 커스터마이징

### 스타일 수정

`css/style.css`에서 색상, 폰트, 레이아웃 등을 수정할 수 있습니다:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  --accent-color: #007bff;
}
```

### 기능 추가

`js/` 디렉토리의 파일들을 수정하여 새로운 기능을 추가할 수 있습니다.

## 🔧 문제 해결

### 게시글이 표시되지 않는 경우

1. `.nojekyll` 파일이 루트에 있는지 확인
2. `posts.json` 파일이 올바르게 생성되었는지 확인
3. 마크다운 파일의 Front Matter 형식 확인
4. GitHub Actions 로그에서 빌드 오류 확인

### 댓글이 표시되지 않는 경우

1. GitHub Discussions 활성화 확인
2. Giscus 앱 설치 확인
3. `data-repo-id`와 `data-category-id` 값 확인

### 로컬에서 테스트하기

```bash
# 간단한 HTTP 서버 실행
python -m http.server 8000
# 또는
npx serve .
```

## 📚 참고 자료

- [GitHub Pages 공식 문서](https://pages.github.com/)
- [Marked.js 문서](https://marked.js.org/)
- [Prism.js 문서](https://prismjs.com/)
- [Giscus 문서](https://giscus.app/)

## 📄 라이선스

MIT License - 자유롭게 사용하고 수정할 수 있습니다.

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 새로운 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📞 지원

문제가 있거나 질문이 있으시면 [Issues](https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io/issues)에서 문의해주세요.

---

**즐거운 블로깅 되세요!** 🎉
