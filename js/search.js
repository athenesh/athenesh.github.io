/**
 * 게시글 검색 및 필터링 기능
 */

class SearchManager {
  constructor() {
    this.searchInput = document.getElementById("searchInput");
    this.searchBtn = document.getElementById("searchBtn");
    this.categoryFilter = document.getElementById("categoryFilter");
    this.tagFilter = document.getElementById("tagFilter");
    this.clearFiltersBtn = document.getElementById("clearFilters");
    this.postsGrid = document.getElementById("postsGrid");
    this.postsCount = document.getElementById("postsCount");
    this.loading = document.getElementById("loading");
    this.noPosts = document.getElementById("noPosts");

    this.allPosts = [];
    this.filteredPosts = [];
    this.searchTerm = "";
    this.selectedCategory = "";
    this.selectedTag = "";

    this.init();
  }

  init() {
    if (!this.searchInput || !this.postsGrid) {
      console.warn("Search elements not found");
      return;
    }

    this.bindEvents();
    this.loadPosts();
  }

  bindEvents() {
    // 검색 이벤트
    this.searchInput.addEventListener("input", (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.performSearch();
    });

    this.searchBtn.addEventListener("click", () => {
      this.performSearch();
    });

    // 엔터키 검색
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performSearch();
      }
    });

    // 필터 이벤트
    this.categoryFilter.addEventListener("change", (e) => {
      this.selectedCategory = e.target.value;
      this.performSearch();
    });

    this.tagFilter.addEventListener("change", (e) => {
      this.selectedTag = e.target.value;
      this.performSearch();
    });

    // 필터 초기화
    this.clearFiltersBtn.addEventListener("click", () => {
      this.clearFilters();
    });
  }

  async loadPosts() {
    try {
      this.showLoading(true);

      const response = await fetch("posts.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.allPosts = await response.json();
      this.filteredPosts = [...this.allPosts];

      this.populateFilters();
      this.renderPosts();
      this.updatePostsCount();

      console.log(`Loaded ${this.allPosts.length} posts`);
    } catch (error) {
      console.error("Failed to load posts:", error);
      this.showError("게시글을 불러오는데 실패했습니다.");
    } finally {
      this.showLoading(false);
    }
  }

  populateFilters() {
    // 카테고리 필터 채우기
    const categories = [
      ...new Set(this.allPosts.map((post) => post.category).filter(Boolean)),
    ];
    this.populateSelect(this.categoryFilter, categories);

    // 태그 필터 채우기
    const allTags = this.allPosts.flatMap((post) => post.tags || []);
    const uniqueTags = [...new Set(allTags)];
    this.populateSelect(this.tagFilter, uniqueTags);
  }

  populateSelect(selectElement, options) {
    // 기존 옵션 제거 (첫 번째 "전체" 옵션 제외)
    while (selectElement.children.length > 1) {
      selectElement.removeChild(selectElement.lastChild);
    }

    // 새 옵션 추가
    options.sort().forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      selectElement.appendChild(optionElement);
    });
  }

  performSearch() {
    this.filteredPosts = this.allPosts.filter((post) => {
      // 검색어 필터링
      const matchesSearch =
        !this.searchTerm ||
        post.title.toLowerCase().includes(this.searchTerm) ||
        post.excerpt.toLowerCase().includes(this.searchTerm) ||
        (post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(this.searchTerm)));

      // 카테고리 필터링
      const matchesCategory =
        !this.selectedCategory || post.category === this.selectedCategory;

      // 태그 필터링
      const matchesTag =
        !this.selectedTag ||
        (post.tags && post.tags.includes(this.selectedTag));

      return matchesSearch && matchesCategory && matchesTag;
    });

    this.renderPosts();
    this.updatePostsCount();
  }

  renderPosts() {
    if (!this.postsGrid) return;

    this.postsGrid.innerHTML = "";

    if (this.filteredPosts.length === 0) {
      this.showNoPosts(true);
      return;
    }

    this.showNoPosts(false);

    this.filteredPosts.forEach((post) => {
      const postCard = this.createPostCard(post);
      this.postsGrid.appendChild(postCard);
    });
  }

  createPostCard(post) {
    const card = document.createElement("a");
    card.href = `post.html?file=${encodeURIComponent(post.file)}`;
    card.className = "post-card";

    const tagsHtml =
      post.tags && post.tags.length > 0
        ? post.tags
            .map(
              (tag) =>
                `<span class="post-card-tag">${this.escapeHtml(tag)}</span>`
            )
            .join("")
        : "";

    const categoryHtml = post.category
      ? `<span class="post-card-category">${this.escapeHtml(
          post.category
        )}</span>`
      : "";

    card.innerHTML = `
      <h3 class="post-card-title">${this.escapeHtml(post.title)}</h3>
      <div class="post-card-meta">
        <span class="post-card-date">📅 ${this.formatDate(post.date)}</span>
        ${categoryHtml}
      </div>
      <p class="post-card-excerpt">${this.escapeHtml(post.excerpt)}</p>
      <div class="post-card-tags">${tagsHtml}</div>
    `;

    return card;
  }

  updatePostsCount() {
    if (this.postsCount) {
      this.postsCount.textContent = `${this.filteredPosts.length}개 게시글`;
    }
  }

  clearFilters() {
    this.searchInput.value = "";
    this.categoryFilter.value = "";
    this.tagFilter.value = "";

    this.searchTerm = "";
    this.selectedCategory = "";
    this.selectedTag = "";

    this.performSearch();
  }

  showLoading(show) {
    if (this.loading) {
      this.loading.style.display = show ? "block" : "none";
    }
  }

  showNoPosts(show) {
    if (this.noPosts) {
      this.noPosts.style.display = show ? "block" : "none";
    }
  }

  showError(message) {
    if (this.postsGrid) {
      this.postsGrid.innerHTML = `
        <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">
          <p>❌ ${message}</p>
          <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-color); color: white; border: none; border-radius: 4px; cursor: pointer;">
            다시 시도
          </button>
        </div>
      `;
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  }
}

// DOM이 로드되면 검색 매니저 초기화
document.addEventListener("DOMContentLoaded", () => {
  new SearchManager();
});
