import Link from 'next/link';

export default function Index() {
  return (
    <div className="mx-40 my-20">
      <h1 className="mb-10 text-2xl text-center">Pasirinkite lentelę</h1>
      <ul>
        <Link href="/irasai" passHref>
          <li className="inline-block p-5 bg-gray-400 cursor-pointer">irasai</li>
        </Link>
      </ul>
    </div>
  );
}
