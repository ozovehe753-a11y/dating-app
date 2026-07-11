import './globals.css';

export const metadata = {
  title: 'Heartly — Find Your Person',
  description: 'A modern dating experience built for meaningful connections.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
