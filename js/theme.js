/**
 * 다크/라이트 모드 테마 토글 기능
 */

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.themeIcon = this.themeToggle?.querySelector(".theme-icon");
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();

    this.init();
  }

  init() {
    if (!this.themeToggle || !this.themeIcon) {
      console.warn("Theme toggle elements not found");
      return;
    }

    // 초기 테마 적용
    this.applyTheme(this.currentTheme);

    // 이벤트 리스너 등록
    this.themeToggle.addEventListener("click", () => this.toggleTheme());

    // 시스템 테마 변경 감지
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  getStoredTheme() {
    return localStorage.getItem("theme");
  }

  getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  setStoredTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;
    this.updateIcon(theme);
    this.setStoredTheme(theme);

    console.log(`Theme applied: ${theme}`);
  }

  updateIcon(theme) {
    if (!this.themeIcon) return;

    this.themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(newTheme);
  }
}

// DOM이 로드되면 테마 매니저 초기화
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});
