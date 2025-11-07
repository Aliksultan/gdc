"use client";

import ReduxProvider from "@/providers/redux-provider";
import { AuthGate } from "@/providers/auth-gate";
import { ThemeProvider } from "@/providers/theme-provider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
