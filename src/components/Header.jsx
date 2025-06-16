import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Vous êtes déconnecté");
  };

  return (
    <header className="w-[95%] md:w-[80%] lg:w-[70%] mx-auto rounded-full bg-slate-700 shadow-md text-white sticky top-0 z-50">
      <nav className="w-full flex flex-wrap justify-center items-center gap-3 py-3">
        <Link
          to="/"
          className="text-sm md:text-base px-3 py-1 font-semibold rounded-full hover:bg-white hover:text-indigo-500 transition duration-300"
        >
          Accueil
        </Link>

        {!token && (
          <Link
            to="/login"
            className="text-sm md:text-base px-3 py-1 font-semibold rounded-full hover:bg-white hover:text-indigo-500 transition duration-300"
          >
            Connexion
          </Link>
        )}

        <Link
          to="/prets"
          className="text-sm md:text-base px-3 py-1 font-semibold rounded-full hover:bg-white hover:text-indigo-500 transition duration-300"
        >
          Prêts
        </Link>

        <Link
          to="/nouveau"
          className="text-sm md:text-base px-3 py-1 font-semibold rounded-full hover:bg-white hover:text-indigo-500 transition duration-300"
        >
          Nouveau
        </Link>

        <Link
          to="/bilan"
          className="text-sm md:text-base px-3 py-1 font-semibold rounded-full hover:bg-white hover:text-indigo-500 transition duration-300"
        >
          Bilan
        </Link>

        {token && (
          <button
            onClick={handleLogout}
            className="text-lg text-red-600 hover:text-red-700 px-2 transition duration-300"
            title="Déconnexion"
          >
            <FaSignOutAlt />
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
