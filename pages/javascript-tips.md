---
title: "JavaScript 개발 팁과 트릭"
date: 2025-01-25
tags: ["JavaScript", "Tips", "Programming"]
category: "Development"
description: "JavaScript 개발에서 유용한 팁과 트릭들을 모아봤습니다."
---

# JavaScript 개발 팁과 트릭

JavaScript 개발을 하면서 유용하게 사용할 수 있는 팁과 트릭들을 정리해보겠습니다.

## 🔧 유용한 배열 메서드

### 1. 배열 중복 제거

```javascript
// Set을 활용한 중복 제거
const uniqueArray = [...new Set(array)];

// filter와 indexOf를 활용한 방법
const uniqueArray2 = array.filter(
  (item, index) => array.indexOf(item) === index
);
```

### 2. 배열 평탄화

```javascript
// flat() 메서드 사용
const flattened = array.flat(2); // 2단계까지 평탄화

// 재귀적으로 완전 평탄화
const deepFlatten = (arr) =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val),
    []
  );
```

### 3. 배열 그룹화

```javascript
// 특정 키로 배열 그룹화
const groupBy = (array, key) =>
  array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
```

## ⚡ 성능 최적화

### 1. 디바운싱과 스로틀링

```javascript
// 디바운싱
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 스로틀링
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

### 2. 메모이제이션

```javascript
// 간단한 메모이제이션
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

## 🎯 모던 JavaScript 기능

### 1. 옵셔널 체이닝

```javascript
// 안전한 객체 접근
const user = {
  profile: {
    name: "John",
    address: {
      city: "Seoul",
    },
  },
};

// 기존 방식
const city =
  user && user.profile && user.profile.address && user.profile.address.city;

// 옵셔널 체이닝
const city = user?.profile?.address?.city;
```

### 2. Nullish 병합 연산자

```javascript
// 기본값 설정
const name = user.name ?? "Anonymous";
const age = user.age ?? 0;

// 기존 방식과의 차이
const name1 = user.name || "Anonymous"; // ''도 기본값으로 처리
const name2 = user.name ?? "Anonymous"; // null, undefined만 기본값으로 처리
```

### 3. 구조 분해 할당

```javascript
// 배열 구조 분해
const [first, second, ...rest] = array;

// 객체 구조 분해
const { name, age, ...otherProps } = user;

// 기본값과 함께
const { name = "Anonymous", age = 0 } = user;

// 별칭 사용
const { name: userName, age: userAge } = user;
```

## 🔍 디버깅 팁

### 1. 콘솔 활용

```javascript
// 객체 구조화 출력
console.log("User:", user);
console.table(users); // 테이블 형태로 출력

// 그룹화
console.group("User Details");
console.log("Name:", user.name);
console.log("Age:", user.age);
console.groupEnd();

// 조건부 로깅
console.assert(user.age > 0, "Age should be positive");
```

### 2. 성능 측정

```javascript
// 시간 측정
console.time("Operation");
// ... 작업 수행
console.timeEnd("Operation");

// 성능 마크
performance.mark("start");
// ... 작업 수행
performance.mark("end");
performance.measure("operation", "start", "end");
```

## 🛡️ 에러 처리

### 1. Try-Catch 활용

```javascript
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // 재throw하여 상위에서 처리
  }
}
```

### 2. Promise 에러 처리

```javascript
// Promise 체인에서 에러 처리
fetchData()
  .then((data) => {
    // 성공 처리
    console.log(data);
  })
  .catch((error) => {
    // 에러 처리
    console.error("Error:", error);
  })
  .finally(() => {
    // 정리 작업
    console.log("Request completed");
  });
```

## 📦 모듈 시스템

### 1. ES6 모듈

```javascript
// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// default export
export default class Calculator {
  constructor() {
    this.result = 0;
  }
}

// main.js
import Calculator, { add, multiply } from "./math.js";
```

### 2. 동적 임포트

```javascript
// 조건부 모듈 로딩
if (condition) {
  const module = await import("./heavy-module.js");
  module.default();
}

// 지연 로딩
const loadModule = async () => {
  const { default: Component } = await import("./Component.js");
  return Component;
};
```

## 🎨 함수형 프로그래밍

### 1. 고차 함수

```javascript
// 커링
const add = (a) => (b) => a + b;
const add5 = add(5);
console.log(add5(3)); // 8

// 파이프라인
const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const processData = pipe(
  (data) => data.filter((x) => x > 0),
  (data) => data.map((x) => x * 2),
  (data) => data.reduce((sum, x) => sum + x, 0)
);
```

### 2. 불변성

```javascript
// 객체 불변성
const updateUser = (user, updates) => ({
  ...user,
  ...updates,
});

// 배열 불변성
const addItem = (array, item) => [...array, item];
const removeItem = (array, index) => array.filter((_, i) => i !== index);
```

## 🚀 최신 기능

### 1. Top-level await

```javascript
// 모듈 최상위에서 await 사용 가능
const data = await fetchData();
console.log(data);
```

### 2. Private 클래스 필드

```javascript
class User {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  getName() {
    return this.#name;
  }
}
```

## 📚 마무리

이러한 팁과 트릭들을 활용하면 더 효율적이고 깔끔한 JavaScript 코드를 작성할 수 있습니다.

모든 기능을 한 번에 익히려고 하지 말고, 프로젝트에 필요한 것부터 차근차근 적용해보세요! 🎯
