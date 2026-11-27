import type { Metadata } from 'next';
import './globals.css';
import BottomNav from './components/bottomnav';
import DevAiButton from './components/DevAiButton';
import { ThemeProvider } from './context/ThemeContext';

export const metadata: Metadata = {
  title: 'Organic Devbhoomi | From Nature to Your Home',
  description:
    'Discover plants, fresh fruits, flowers and seeds from Devbhoomi Himachal.',
};

const themeInitScript = `
(function () {
  try {
    var savedTheme = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    var root = document.documentElement;
    var body = document.body;

    if (isDark) {
      root.classList.add('dark');
      if (body) body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      if (body) body.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-screen antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <DevAiButton />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
