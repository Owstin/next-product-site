import smallUsersData from '@/src/mock/small/users.json';
import Link from 'next/link';

export default function Orders() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {smallUsersData.map((user) => (
            <div
              key={user.id}
              className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            >
              <Link href={`/orders/${user.id}`}>
                <h3 className={`mb-3 text-2xl font-semibold`}>
                  {user.firstName} {user.lastName}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* <div className='flex justify-around w-full border-t-2 pt-4'>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div> */}
    </main>
  );
}
