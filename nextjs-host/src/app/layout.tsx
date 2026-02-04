import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Búsqueda de Usuarios GitHub - Demostración Module Federation',
  description: 'Busca usuarios de GitHub con Next.js y microfrontends Angular',
  keywords: ['GitHub', 'Module Federation', 'Next.js', 'Angular', 'Microfrontends'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-github-dark">
          <header className="border-b border-github-border bg-github-light">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center gap-3">
                <svg
                  height="32"
                  viewBox="0 0 16 16"
                  width="32"
                  className="fill-white"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <h1 className="text-xl font-semibold text-white">
                  Búsqueda de Usuarios GitHub
                </h1>
                <span className="text-xs bg-github-border px-2 py-1 rounded-full text-github-text">
                  Module Federation
                </span>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
          <footer className="border-t border-github-border mt-auto py-6">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
              <p>
                Construido con Next.js + Angular usando Module Federation |
                Prueba Técnica DoubleV Partners
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
