import './globals.css';
export const metadata = {
  title: 'Tunga Elementary School — School Management System',
  description: 'Tunga ES, Moalboal, Cebu. School ID: 119502. Schools Division of Cebu Province, Region VII.',
  icons: { icon: '/logo.jpg' },
};
export default function RootLayout({ children }) {
  return (<html lang="en"><body>{children}</body></html>);
}
