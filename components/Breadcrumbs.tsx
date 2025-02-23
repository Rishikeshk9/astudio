'use client';

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className='mb-6'>
      <ol className='flex items-center gap-2 text-2xl font-bold'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center'>
            {index > 0 && <span className='mx-2 text-gray-400'>/</span>}
            {item.href ? (
              <a href={item.href} className='text-gray-500 hover:text-gray-900'>
                {item.label}
              </a>
            ) : (
              <div className='relative ml-3 -mb-3 px-2'>
                <div className='bg-[#fdc936] w-[90%] h-1/2 absolute  top-1 -ml-3 '></div>
                <span className='text-black relative -top-2 -left-2'>
                  {item.label}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
