// 主題配置系統
// 極簡主題配色和視覺特性

export const minimalTheme = {
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
};

// 獲取主題配置
export function getTheme() {
  return minimalTheme;
}
