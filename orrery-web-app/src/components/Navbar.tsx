import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
export default function Navbar() {
  return (
    <div className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-yellow-400">Space Education Orrery</h1>
        <nav className="flex space-x-4">
          <Link href="/">
            <a className="text-yellow-300 font-bold">Home</a>
          </Link>

          <Link href={'/about'}>
          <Button variant="link" className="text-yellow-300 font-bold">About</Button>
          </Link>
          <Link href={'/contact'}>
          <Button variant="link" className="text-yellow-300 font-bold">Contact</Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
