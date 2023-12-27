import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Providers from '~/components/hooks/useProviders';

import './_css/pre.css';
import './_css/root.css';

const openSans = Open_Sans({ subsets: ['latin'] });

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
      <body className={openSans.className}>
        <Providers>
          <>{children}</>
        </Providers>
      </body>
    </html>
  );
}
