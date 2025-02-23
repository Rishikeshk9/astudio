import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata = {
  title: 'Product Management System',
  description: 'A system to manage users and products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-50  '>
        <Providers>
          <nav className='bg-gray-800 text-white p-4'>
            <div className='container mx-auto flex gap-4'>
              <a href='/users' className='hover:text-gray-300'>
                Users
              </a>
              <a href='/products' className='hover:text-gray-300'>
                Products
              </a>
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
