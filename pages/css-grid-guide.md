---
title: "CSS Grid 완벽 가이드"
date: 2025-01-24
tags: ["CSS", "Grid", "Layout", "Web Design"]
category: "Design"
description: "CSS Grid를 활용한 레이아웃 디자인 방법을 자세히 알아봅니다."
---

# CSS Grid 완벽 가이드

CSS Grid는 2차원 레이아웃 시스템으로, 복잡한 웹 페이지 레이아웃을 쉽고 직관적으로 만들 수 있게 해줍니다.

## 🎯 Grid 기본 개념

### Grid Container와 Grid Items

```css
.grid-container {
  display: grid;
  /* 이제 .grid-container의 직접적인 자식들이 Grid Items가 됩니다 */
}

.grid-item {
  /* Grid Item은 Grid Container 내부의 직접적인 자식 요소입니다 */
}
```

### Grid Lines와 Grid Tracks

- **Grid Lines**: Grid를 나누는 선들
- **Grid Tracks**: Grid Lines 사이의 공간 (행 또는 열)

## 📐 Grid 속성들

### 1. Grid Container 속성

#### `grid-template-columns`와 `grid-template-rows`

```css
.grid-container {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* 3개의 열 */
  grid-template-rows: 100px 100px; /* 2개의 행 */
}

/* fr 단위 사용 */
.grid-container {
  grid-template-columns: 1fr 2fr 1fr; /* 중간 열이 두 배 크기 */
}

/* repeat() 함수 사용 */
.grid-container {
  grid-template-columns: repeat(3, 1fr); /* 3개의 동일한 열 */
  grid-template-rows: repeat(2, 100px); /* 2개의 100px 행 */
}

/* auto-fit과 minmax() 조합 */
.grid-container {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

#### `grid-gap` (또는 `gap`)

```css
.grid-container {
  gap: 20px; /* 행과 열 모두 20px 간격 */
  row-gap: 10px; /* 행 간격만 10px */
  column-gap: 30px; /* 열 간격만 30px */
}
```

#### `grid-template-areas`

```css
.grid-container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 60px 1fr 60px;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

### 2. Grid Item 속성

#### `grid-column`과 `grid-row`

```css
.grid-item {
  grid-column: 1 / 3; /* 1번 라인부터 3번 라인까지 */
  grid-row: 2 / 4; /* 2번 라인부터 4번 라인까지 */
}

/* span 키워드 사용 */
.grid-item {
  grid-column: 1 / span 2; /* 1번 라인부터 2칸 */
  grid-row: span 3; /* 3칸 */
}

/* grid-area로 한 번에 지정 */
.grid-item {
  grid-area: 1 / 1 / 3 / 3; /* row-start / column-start / row-end / column-end */
}
```

## 🎨 실전 예제들

### 1. 카드 레이아웃

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
```

### 2. 홈페이지 레이아웃

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "nav main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
}

.header {
  grid-area: header;
  background: #333;
  color: white;
}

.nav {
  grid-area: nav;
  background: #f4f4f4;
  padding: 1rem;
}

.main {
  grid-area: main;
  padding: 2rem;
}

.footer {
  grid-area: footer;
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
}
```

### 3. 갤러리 레이아웃

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.gallery-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}
```

## 📱 반응형 Grid

### 1. 미디어 쿼리 활용

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 2. `auto-fit`과 `auto-fill`

```css
/* auto-fit: 빈 공간을 채움 */
.auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* auto-fill: 빈 공간을 그대로 둠 */
.auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

## 🎯 고급 기법

### 1. 중첩 Grid

```css
.outer-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.inner-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
```

### 2. Grid와 Flexbox 조합

```css
.card {
  display: flex;
  flex-direction: column;
}

.card-header {
  flex: 0 0 auto;
}

.card-content {
  flex: 1 1 auto;
}

.card-footer {
  flex: 0 0 auto;
}
```

### 3. 명명된 Grid Lines

```css
.grid-container {
  display: grid;
  grid-template-columns:
    [sidebar-start] 200px
    [sidebar-end main-start] 1fr
    [main-end];
  grid-template-rows:
    [header-start] 60px
    [header-end content-start] 1fr
    [content-end footer-start] 60px
    [footer-end];
}

.header {
  grid-column: sidebar-start / main-end;
  grid-row: header-start / header-end;
}
```

## 🔧 유틸리티 클래스

```css
/* Grid 유틸리티 */
.grid {
  display: grid;
}
.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.gap-1 {
  gap: 0.25rem;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-4 {
  gap: 1rem;
}
.gap-8 {
  gap: 2rem;
}

.col-span-1 {
  grid-column: span 1;
}
.col-span-2 {
  grid-column: span 2;
}
.col-span-3 {
  grid-column: span 3;
}
.col-span-full {
  grid-column: 1 / -1;
}

.row-span-1 {
  grid-row: span 1;
}
.row-span-2 {
  grid-row: span 2;
}
.row-span-3 {
  grid-row: span 3;
}
.row-span-full {
  grid-row: 1 / -1;
}
```

## 🐛 일반적인 문제와 해결책

### 1. Grid Item이 예상과 다르게 배치되는 경우

```css
/* 명시적으로 grid-area 지정 */
.grid-item {
  grid-area: 1 / 1 / 2 / 2; /* row-start / col-start / row-end / col-end */
}
```

### 2. 반응형에서 Grid가 깨지는 경우

```css
/* minmax()와 auto-fit 조합 사용 */
.responsive-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

### 3. Grid Gap이 예상과 다른 경우

```css
/* gap 대신 grid-gap 사용 (구형 브라우저 지원) */
.grid-container {
  grid-gap: 1rem; /* 구형 브라우저 */
  gap: 1rem; /* 모던 브라우저 */
}
```

## 📚 마무리

CSS Grid는 강력한 레이아웃 도구입니다. 복잡한 레이아웃도 간단하게 만들 수 있지만, 적절한 연습이 필요합니다.

다음 단계로는:

1. 실제 프로젝트에 Grid 적용해보기
2. Flexbox와 Grid의 차이점 이해하기
3. 복잡한 레이아웃 패턴 연습하기

Grid를 마스터하면 웹 디자인이 훨씬 즐거워질 것입니다! 🎨
