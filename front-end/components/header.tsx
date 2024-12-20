import Link from "next/link";
import { useEffect, useState } from "react";
import Language from "./language/Language";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ fullname: string } | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="p-6 mb-6 border-b border-gray-700 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 flex flex-col items-center shadow-lg">
      <a className="flex mb-6 text-white text-4xl font-bold text-center hover:text-gray-100">
        {t('app.title')}
      </a>
      <nav className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8 space-y-4 md:space-y-0">
        <Link
          href="/"
          className="px-6 py-2 text-xl text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {t('header.nav.home')}
        </Link>
        {loggedInUser ? (
          <>
            <Link
              href="/filmLijst"
              className="px-6 py-2 text-xl text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {t('header.nav.films')}
            </Link>
            <Link
              href="/reviews"
              className="px-6 py-2 text-xl text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {t('header.nav.reviews')}
            </Link>
            <Link
              href="/watchlist"
              className="px-6 py-2 text-xl text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {t('header.nav.watchlist')}
            </Link>
          </>
        ) : null}
        {!loggedInUser && (
          <Link
            href="/login"
            className="px-6 py-2 text-xl text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {t('header.nav.login')}
          </Link>
        )}
        {loggedInUser && (
          <a
            href="/login"
            onClick={handleClick}
            className="px-6 py-2 text-xl text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {t('header.nav.logout')}
          </a>
        )}
        {loggedInUser && (
          <div className="text-white mt-2 md:mt-0 font-medium">
            {t('header.welcome')}, {loggedInUser.fullname}!
          </div>
        )}
        <Language />
      </nav>
    </header>
  );
};

export default Header;
