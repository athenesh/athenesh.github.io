---
title: "GitHub Pages 정적 블로그 구축하기"
date: 2025-01-26
tags: ["GitHub Pages", "JavaScript", "Markdown", "Blog"]
category: "Development"
description: "GitHub Pages를 활용하여 마크다운 기반의 정적 블로그를 구축하는 방법을 알아봅니다."
---

# GitHub Pages 정적 블로그 구축하기

GitHub Pages를 활용하여 마크다운 기반의 정적 블로그를 구축하는 방법을 단계별로 알아보겠습니다.

## 🎯 프로젝트 개요

이 프로젝트는 다음과 같은 특징을 가집니다:

- **정적 사이트**: HTML, CSS, JavaScript만 사용
- **마크다운 지원**: `.md` 파일로 게시글 작성
- **자동 배포**: GitHub Actions를 통한 자동 빌드 및 배포
- **다크/라이트 모드**: 사용자 선호에 따른 테마 전환
- **검색 기능**: 클라이언트 사이드 검색 및 필터링
- **댓글 시스템**: Giscus를 활용한 GitHub Discussions 연동

## 🛠️ 기술 스택

### 프론트엔드

- **HTML5**: 시맨틱 마크업
- **CSS3**: CSS 변수를 활용한 다크/라이트 모드
- **Vanilla JavaScript**: 프레임워크 없이 순수 JavaScript 사용

### 외부 라이브러리

- **marked.js**: 마크다운 파싱
- **Prism.js**: 코드 하이라이팅
- **Giscus**: 댓글 시스템

### 배포 및 자동화

- **GitHub Pages**: 정적 사이트 호스팅
- **GitHub Actions**: CI/CD 파이프라인
- **Node.js**: 빌드 스크립트 실행

## 📁 디렉토리 구조

```
/
├── .nojekyll                 # Jekyll 비활성화
├── index.html               # 메인 페이지
├── post.html                # 게시글 상세 페이지
├── css/
│   ├── style.css            # 메인 스타일
│   └── prism.css            # 코드 하이라이팅
├── js/
│   ├── app.js               # 메인 애플리케이션
│   ├── search.js            # 검색 기능
│   ├── post-loader.js       # 게시글 로딩
│   └── theme.js             # 테마 토글
├── pages/                   # 마크다운 게시글
│   └── example.md
├── .github/
│   ├── workflows/
│   │   └── deploy.yml       # 배포 워크플로우
│   └── scripts/
│       └── generate-posts.js # posts.json 생성
└── posts.json               # 게시글 메타데이터 (자동 생성)
```

## 🚀 주요 기능

### 1. 마크다운 파싱

게시글은 Front Matter를 포함한 마크다운 형식으로 작성됩니다:

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

### 2. 다크/라이트 모드

CSS 변수를 활용하여 테마를 동적으로 전환합니다:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  /* ... */
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  /* ... */
}
```

### 3. 검색 및 필터링

클라이언트 사이드에서 실시간 검색과 필터링을 제공합니다:

```javascript
// 검색어로 필터링
const matchesSearch =
  post.title.toLowerCase().includes(searchTerm) ||
  post.excerpt.toLowerCase().includes(searchTerm);

// 카테고리로 필터링
const matchesCategory = !selectedCategory || post.category === selectedCategory;
```

### 4. 자동 배포

GitHub Actions를 통해 코드 푸시 시 자동으로 빌드하고 배포합니다:

```yaml
- name: Generate posts.json
  run: node .github/scripts/generate-posts.js

- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```

## 📝 게시글 작성 방법

1. `pages/` 디렉토리에 `.md` 파일 생성
2. Front Matter 작성
3. 마크다운으로 내용 작성
4. Git에 커밋 및 푸시
5. GitHub Actions가 자동으로 빌드 및 배포

## 🎨 커스터마이징

### 스타일 수정

`css/style.css` 파일에서 색상, 폰트, 레이아웃 등을 수정할 수 있습니다.

### 기능 추가

`js/` 디렉토리의 파일들을 수정하여 새로운 기능을 추가할 수 있습니다.

### 테마 변경

CSS 변수 값을 수정하여 완전히 새로운 테마를 만들 수 있습니다.

## 🔧 문제 해결

### Jekyll 관련 문제

`.nojekyll` 파일이 루트에 있는지 확인하세요. 이 파일이 없으면 GitHub Pages가 Jekyll로 빌드하려고 시도합니다.

### 게시글이 표시되지 않는 경우

1. `posts.json` 파일이 올바르게 생성되었는지 확인
2. 마크다운 파일의 Front Matter 형식이 올바른지 확인
3. GitHub Actions 로그에서 빌드 오류 확인

### 댓글이 표시되지 않는 경우

1. GitHub Discussions가 활성화되어 있는지 확인
2. Giscus 앱이 설치되어 있는지 확인
3. `data-repo-id`와 `data-category-id`가 올바른지 확인

## 📚 참고 자료

- [GitHub Pages 공식 문서](https://pages.github.com/)
- [Marked.js 문서](https://marked.js.org/)
- [Prism.js 문서](https://prismjs.com/)
- [Giscus 문서](https://giscus.app/)

## 🎉 결론

GitHub Pages를 활용한 정적 블로그는 다음과 같은 장점이 있습니다:

- **무료 호스팅**: GitHub Pages는 무료로 제공
- **자동 배포**: Git 푸시만으로 자동 배포
- **버전 관리**: Git을 통한 게시글 버전 관리
- **확장성**: 필요에 따라 기능 추가 가능
- **성능**: 정적 사이트로 빠른 로딩 속도

이제 여러분만의 블로그를 시작해보세요! 🚀
