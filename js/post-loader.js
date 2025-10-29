/**
 * 게시글 로딩 및 마크다운 파싱 기능
 */

class PostLoader {
  constructor() {
    this.postTitle = document.getElementById("postTitle");
    this.postDate = document.getElementById("postDate");
    this.postTags = document.getElementById("postTags");
    this.postContent = document.getElementById("postContent");
    this.pageTitle = document.getElementById("pageTitle");

    this.currentPost = null;

    this.init();
  }

  init() {
    if (!this.postContent) {
      console.warn("Post elements not found");
      return;
    }

    // URL에서 파일명 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get("file");

    if (fileName) {
      this.loadPost(fileName);
    } else {
      this.showError("게시글을 찾을 수 없습니다.");
    }
  }

  async loadPost(fileName) {
    try {
      this.showLoading(true);

      // posts.json에서 게시글 정보 가져오기
      const postsResponse = await fetch("posts.json");
      if (!postsResponse.ok) {
        throw new Error(`Failed to load posts.json: ${postsResponse.status}`);
      }

      const posts = await postsResponse.json();
      this.currentPost = posts.find((post) => post.file === fileName);

      if (!this.currentPost) {
        throw new Error("Post not found");
      }

      // 마크다운 파일 로드
      const markdownResponse = await fetch(`pages/${fileName}`);
      if (!markdownResponse.ok) {
        throw new Error(
          `Failed to load markdown file: ${markdownResponse.status}`
        );
      }

      const markdownContent = await markdownResponse.text();
      const parsedContent = this.parseMarkdown(markdownContent);

      this.renderPost(parsedContent);
      this.loadGiscus();

      console.log(`Post loaded: ${fileName}`);
    } catch (error) {
      console.error("Failed to load post:", error);
      this.showError("게시글을 불러오는데 실패했습니다.");
    } finally {
      this.showLoading(false);
    }
  }

  parseMarkdown(content) {
    // Front Matter 파싱
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    let metadata = {};
    let markdownContent = content;

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      markdownContent = frontMatterMatch[2];

      // Front Matter 파싱
      const lines = frontMatter.split("\n");
      lines.forEach((line) => {
        const colonIndex = line.indexOf(":");
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          let value = line.substring(colonIndex + 1).trim();

          // 따옴표 제거
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }

          // 배열 파싱 (tags)
          if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
            try {
              value = JSON.parse(value);
            } catch {
              value = value
                .slice(1, -1)
                .split(",")
                .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""));
            }
          }

          metadata[key] = value;
        }
      });
    }

    // 마크다운을 HTML로 변환
    const htmlContent = marked.parse(markdownContent);

    return {
      metadata,
      content: htmlContent,
    };
  }

  renderPost(parsedContent) {
    const { metadata, content } = parsedContent;
    const post = this.currentPost;

    // 제목 설정
    if (this.postTitle) {
      this.postTitle.textContent = post.title;
    }
    if (this.pageTitle) {
      this.pageTitle.textContent = `${post.title} - GitHub Pages 블로그`;
    }

    // 날짜 설정
    if (this.postDate) {
      this.postDate.textContent = this.formatDate(post.date);
    }

    // 태그 설정
    if (this.postTags && post.tags && post.tags.length > 0) {
      this.postTags.innerHTML = post.tags
        .map((tag) => `<span class="post-tag">${this.escapeHtml(tag)}</span>`)
        .join("");
    }

    // 내용 설정
    if (this.postContent) {
      this.postContent.innerHTML = content;

      // 코드 하이라이팅 적용
      this.highlightCode();
    }
  }

  highlightCode() {
    // Prism.js로 코드 하이라이팅 적용
    if (typeof Prism !== "undefined") {
      Prism.highlightAll();
    }
  }

  loadGiscus() {
    // Giscus 댓글 시스템 로드
    const giscusContainer = document.getElementById("giscus-comments");
    if (!giscusContainer) return;

    // 기존 Giscus 제거
    giscusContainer.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "athenesh/athenesh.github.io");
    script.setAttribute("data-repo-id", "R_kgDOQLHI4A");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOQLHI4M4CxMbG");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    giscusContainer.appendChild(script);
  }

  showLoading(show) {
    if (this.postContent) {
      if (show) {
        this.postContent.innerHTML = `
          <div class="loading">
            <div class="spinner"></div>
            <p>게시글을 불러오는 중...</p>
          </div>
        `;
      }
    }
  }

  showError(message) {
    if (this.postContent) {
      this.postContent.innerHTML = `
        <div class="error-message" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
          <h2>❌ 오류</h2>
          <p>${message}</p>
          <a href="/" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--accent-color); color: white; text-decoration: none; border-radius: 6px;">
            홈으로 돌아가기
          </a>
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

// DOM이 로드되면 포스트 로더 초기화
document.addEventListener("DOMContentLoaded", () => {
  new PostLoader();
});
