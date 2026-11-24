
import type { Metadata } from 'next';
import './globals.css';
import BottomNav from './components/bottomnav';

export const metadata: Metadata = {
  title: 'Organic Devbhoomi | From Nature to Your Home',
  description:
    'Discover plants, fresh fruits, flowers and seeds from Devbhoomi Himachal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
