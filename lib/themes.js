// 主題配置系統
// 定義三個主題的配色和視覺特性

export const themes = {
  minimal: {
    id: "minimal",
    name: "現代極簡",
    description: "專業、簡潔、易讀",
    colors: {
      light: {
        primary: "#6B7FD7",      // 柔和靛藍
        background: "#E8EEF2",   // 藍灰背景
        surface: "#FFFFFF",      // 卡片背景
        text: "#1A202C",         // 深色文字
        textSecondary: "#4A5568",// 次要文字
        border: "#E2E8F0",       // 邊框
        accent: "#5A67D8"        // 強調色
      },
      dark: {
        primary: "#818CF8",      // 亮靛藍
        background: "#1A1F2E",   // 深藍灰背景
        surface: "#232939",      // 卡片背景
        text: "#F7FAFC",         // 淺色文字
        textSecondary: "#A0AEC0",// 次要文字
        border: "#2D3748",       // 邊框
        accent: "#6366F1"        // 強調色
      }
    },
    styles: {
      borderRadius: "0.5rem",   // 8px
      cardShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      spacing: "generous",       // 大量留白
      typography: {
        fontFamily: "'Poppins', sans-serif",
        heroSize: "4rem",        // 64px
        h1Size: "2.5rem",        // 40px
        bodySize: "1rem"         // 16px
      }
    }
  },

  bento: {
    id: "bento",
    name: "Bento Grid",
    description: "活潑、模組化、視覺豐富",
    colors: {
      light: {
        primary: "#FF9B85",      // 柔和珊瑚橘
        secondary: "#A8D5BA",    // 薄荷綠
        tertiary: "#FFD4A3",     // 淺金黃
        background: "#FAF8F3",   // 溫暖米白
        surface: "#FFFFFF",      // 卡片背景
        text: "#2D2D2D",         // 深色文字
        textSecondary: "#666666",// 次要文字
        border: "#E8E5DF",       // 邊框
        accent: "#FF8C75"        // 強調色
      }
    },
    styles: {
      borderRadius: "1rem",     // 16px (更圓)
      cardShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      spacing: "compact",        // 緊湊但清晰
      typography: {
        fontFamily: "'Poppins', sans-serif",
        heroSize: "3.5rem",      // 56px
        h1Size: "2.25rem",       // 36px
        bodySize: "1rem"         // 16px
      },
      grid: {
        gap: "1rem",             // 16px
        minCardSize: "200px",
        maxColumns: 4
      }
    }
  },

  signature: {
    id: "signature",
    name: "品牌個性化",
    description: "獨特、優雅、藝術感",
    colors: {
      light: {
        primary: "#B8A4D9",      // 柔和紫羅蘭
        secondary: "#E8C5A5",    // 粉金色
        tertiary: "#D4A5C3",     // 淺玫瑰
        background: "#FFF9F0",   // 奶油白
        surface: "#FFFFFF",      // 卡片背景
        text: "#2A2A2A",         // 深色文字
        textSecondary: "#5A5A5A",// 次要文字
        border: "#F0E6D8",       // 邊框
        accent: "#A890C8",       // 強調色
        gradient: "radial-gradient(circle at 20% 50%, rgba(184, 164, 217, 0.15) 0%, transparent 50%)"
      }
    },
    styles: {
      borderRadius: "1.5rem",   // 24px (最圓)
      cardShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
      spacing: "flowing",        // 有機的間距
      typography: {
        fontFamily: "'Poppins', sans-serif",
        heroSize: "4.5rem",      // 72px
        h1Size: "2.75rem",       // 44px
        bodySize: "1.0625rem"    // 17px (稍大)
      },
      geometric: {
        shapes: ["circle", "triangle", "arc"],
        opacity: 0.6,
        animationSpeed: "slow"
      }
    }
  }
};

// 預設主題
export const defaultTheme = "minimal";

// 獲取主題配置
export function getTheme(themeId) {
  return themes[themeId] || themes[defaultTheme];
}

// 獲取所有主題列表
export function getAllThemes() {
  return Object.values(themes);
}

// 檢查是否為有效主題
export function isValidTheme(themeId) {
  return themeId in themes;
}
