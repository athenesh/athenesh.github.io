/**
 * 메인 애플리케이션 로직
 */

class App {
  constructor() {
    this.init();
  }

  init() {
    console.log("GitHub Pages 블로그 애플리케이션이 시작되었습니다.");

    // 전역 에러 핸들링
    this.setupErrorHandling();

    // 성능 모니터링
    this.setupPerformanceMonitoring();

    // 접근성 개선
    this.setupAccessibility();
  }

  setupErrorHandling() {
    // 전역 에러 핸들러
    window.addEventListener("error", (event) => {
      console.error("Global error:", event.error);
      this.showErrorNotification("예상치 못한 오류가 발생했습니다.");
    });

    // Promise rejection 핸들러
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      this.showErrorNotification("네트워크 오류가 발생했습니다.");
    });
  }

  setupPerformanceMonitoring() {
    // 페이지 로드 시간 측정
    window.addEventListener("load", () => {
      const loadTime = performance.now();
      console.log(`페이지 로드 시간: ${Math.round(loadTime)}ms`);

      // 느린 로딩 경고
      if (loadTime > 3000) {
        console.warn("페이지 로딩이 느립니다. 네트워크 상태를 확인해주세요.");
      }
    });

    // 이미지 로딩 최적화
    this.optimizeImages();
  }

  setupAccessibility() {
    // 키보드 네비게이션 개선
    document.addEventListener("keydown", (event) => {
      // ESC 키로 모달 닫기
      if (event.key === "Escape") {
        this.closeModals();
      }

      // Tab 키로 포커스 관리
      if (event.key === "Tab") {
        this.manageFocus(event);
      }
    });

    // 스크린 리더 지원
    this.announcePageChanges();
  }

  optimizeImages() {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      // 지연 로딩 설정
      if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }

      // 이미지 로드 에러 처리
      img.addEventListener("error", () => {
        img.alt = "이미지를 불러올 수 없습니다.";
        img.style.backgroundColor = "var(--bg-tertiary)";
        img.style.padding = "2rem";
        img.style.textAlign = "center";
        img.style.color = "var(--text-muted)";
      });
    });
  }

  manageFocus(event) {
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab: 역방향
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: 정방향
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  announcePageChanges() {
    // 페이지 제목 변경 시 스크린 리더에 알림
    const titleElement = document.querySelector("title");
    if (titleElement) {
      const observer = new MutationObserver(() => {
        this.announceToScreenReader(
          `페이지가 변경되었습니다: ${titleElement.textContent}`
        );
      });
      observer.observe(titleElement, { childList: true, characterData: true });
    }
  }

  announceToScreenReader(message) {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.style.position = "absolute";
    announcement.style.left = "-10000px";
    announcement.style.width = "1px";
    announcement.style.height = "1px";
    announcement.style.overflow = "hidden";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  closeModals() {
    // 열린 모달이나 오버레이 닫기
    const modals = document.querySelectorAll(".modal, .overlay");
    modals.forEach((modal) => {
      if (modal.style.display !== "none") {
        modal.style.display = "none";
      }
    });
  }

  showErrorNotification(message) {
    // 기존 알림 제거
    const existingNotification = document.querySelector(".error-notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // 새 알림 생성
    const notification = document.createElement("div");
    notification.className = "error-notification";
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #f8d7da;
      color: #721c24;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      border: 1px solid #f5c6cb;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      max-width: 400px;
      font-size: 0.9rem;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>⚠️</span>
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: none; border: none; font-size: 1.2rem; cursor: pointer; margin-left: auto;">
          ×
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // 5초 후 자동 제거
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  // 유틸리티 메서드들
  static debounce(func, wait) {
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

  static throttle(func, limit) {
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

  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  static getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  static setQueryParam(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, "", url);
  }
}

// DOM이 로드되면 앱 초기화
document.addEventListener("DOMContentLoaded", () => {
  new App();
});

// 전역 유틸리티 함수로 노출
window.AppUtils = {
  debounce: App.debounce,
  throttle: App.throttle,
  formatBytes: App.formatBytes,
  getQueryParam: App.getQueryParam,
  setQueryParam: App.setQueryParam,
};
