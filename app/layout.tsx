import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: `The Deep Mirror — AI-powered Enneagram assessment that gets more accurate every time`,
  description: `Get your most accurate Enneagram result through conversational AI. Three sessions, no multiple choice. For leaders who need insights, not just labels.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&family=Crimson+Text:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-text min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
