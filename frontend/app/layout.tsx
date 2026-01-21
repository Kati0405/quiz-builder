import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <nav
          style={{
            padding: 16,
            borderBottom: '1px solid #eee',
            display: 'flex',
            gap: 12,
          }}
        >
          <Link href='/create'>Create</Link>
          <Link href='/quizzes'>Quizzes</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
