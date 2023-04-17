import "./globals.css";

export const metadata = {
  title: "Time Travel Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container mx-auto flex h-screen items-center justify-center bg-slate-50">
        {children}
      </body>
    </html>
  );
}
