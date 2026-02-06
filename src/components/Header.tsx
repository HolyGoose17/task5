'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaChevronLeft, FaCode, FaHome, FaRegUserCircle, FaUsers } from 'react-icons/fa';
import { FcQuestions } from 'react-icons/fc';
import { IoLanguageSharp } from 'react-icons/io5';
import { MdOutlineSnippetFolder, MdOutlineTextSnippet } from 'react-icons/md';

import { logoutAction } from '../actions/auth';
import { Button } from '../modules/Button';
import { NavLink } from '../modules/NavLink';
import { AuthResponse } from '../utils/types';

interface HeaderProps {
  user: AuthResponse | null;
}

export default function Header({ user }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <>
      <header className="w-full h-16 px-10 flex justify-between items-center fixed top-0 left-0 bg-blue-700 text-white z-50 shadow-md">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setDrawerOpen(true)}
            className="cursor-pointer hover:text-gray-200 focus:outline-none"
          >
            <FaCode className="w-6 h-6" />
          </button>

          <Link href="/home" className="font-bold text-lg">
            CODELANG
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          {!user ? (
            <>
              <div className="hidden sm:block">Not authorized</div>
              <Link href="/login">
                <Button size="md" variant="primary">
                  Sign in
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button size="md" variant="primary" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          )}

          <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
            <IoLanguageSharp className="w-6 h-6" />
            <span>EN</span>
          </div>
        </div>
      </header>

      <aside
        className={`
          fixed top-0 left-0 mt-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          z-40
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <span className="font-semibold text-gray-500">{user?.data.username}</span>
          <button
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 cursor-pointer"
            onClick={() => setDrawerOpen(false)}
          >
            <FaChevronLeft />
          </button>
        </div>

        <nav className="flex flex-col py-4">
          <NavLink
            href="/home"
            icon={<FaHome />}
            label="Home"
            onClick={() => setDrawerOpen(false)}
          />
          <NavLink
            href="/account"
            icon={<FaRegUserCircle />}
            label="My Account"
            onClick={() => setDrawerOpen(false)}
          />
          <NavLink
            href="/snippets/new"
            icon={<MdOutlineTextSnippet />}
            label="Post Snippets"
            onClick={() => setDrawerOpen(false)}
          />
          <NavLink
            href="/snippets"
            icon={<MdOutlineSnippetFolder />}
            label="My Snippets"
            onClick={() => setDrawerOpen(false)}
          />
          <NavLink
            href="/questions"
            icon={<FcQuestions />}
            label="Questions"
            onClick={() => setDrawerOpen(false)}
          />
          <NavLink
            href="/users"
            icon={<FaUsers />}
            label="Users"
            onClick={() => setDrawerOpen(false)}
          />
        </nav>
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setDrawerOpen(false)} />
      )}
    </>
  );
}
