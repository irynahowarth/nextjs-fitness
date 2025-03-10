import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Fitness App",
  description: "My best fitness app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <aside className="w-full flex-none md:w-6">
          <nav>
            <ul>
              <li><Link href="/">home</Link></li>
              <li><Link href="/exercises">Exercises</Link></li>
              <li><Link href="/circuits">Circuits</Link></li>
              <li><Link href="/workouts">Workouts</Link></li>
              <li><Link href="/programs">Programs</Link></li>
            </ul>
          </nav>
        </aside>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
