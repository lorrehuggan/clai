import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '~/lib/hooks/providers';

import './_css/pre.css';
import './_css/root.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lapis By Clai',
  description: 'Ai Enhanced Zettelkasten Notation App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
