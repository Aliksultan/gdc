"use client";

export function Footer() {
  return (
    <footer className="border-t mb-0 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} 2%</span>
        <div className="flex items-center gap-4">
          <a target="_blank" href="/" className="hover:text-foreground">
            Privacy
          </a>
          <a target="_blank" href="/" className="hover:text-foreground">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
