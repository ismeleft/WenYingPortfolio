"use client";

import { useTheme } from "./ThemeProvider";
import { MinimalHome } from "@/app/themes/minimal/MinimalHome";
import { BentoHome } from "@/app/themes/bento/BentoHome";
import { SignatureHome } from "@/app/themes/signature/SignatureHome";

/**
 * ThemedPage - 根據當前主題渲染對應的首頁
 */
export function ThemedPage() {
  const { currentTheme } = useTheme();

  // 根據主題返回對應的首頁元件
  switch (currentTheme) {
    case "minimal":
      return <MinimalHome />;

    case "bento":
      return <BentoHome />;

    case "signature":
      return <SignatureHome />;

    default:
      return <MinimalHome />;
  }
}
