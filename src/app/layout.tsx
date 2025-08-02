import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Airport English Lesson - Learn Travel Vocabulary",
  description: "Complete beginner English lesson focused on airport and travel vocabulary. Practice alphabet, vocabulary, and sentence structure.",
  keywords: "English lesson, airport vocabulary, travel English, beginner English, ESL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
