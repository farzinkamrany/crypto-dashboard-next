import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <span className="font-bold text-lg cursor-pointer">CryptoDash ⚡</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a className="text-sm underline" href="https://www.coingecko.com/en/api" target="_blank" rel="noreferrer">API</a>
            <a className="text-sm underline" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </header>
      <main className="container py-6">{children}</main>
      <footer className="container py-10 text-xs opacity-70">
        Built with Next.js, Tailwind, Zustand & Recharts.
      </footer>
    </div>
  );
}
