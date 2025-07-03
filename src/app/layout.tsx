import './globals.css';

export const metadata = {
  title: 'Spektrum Galerie',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-black bg-white">
        {children}
      </body>
    </html>
  );
}
