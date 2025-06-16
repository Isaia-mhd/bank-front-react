import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    
    localStorage.removeItem("token");

    navigate("/login");
    toast.success("Vous êtes deconnecté");
  };

  return (
    <header className="group w-[150px] h-screen bg-slate-900 py-4 cursor-pointer text-white sticky top-0 overflow-hidden">
     
      <div className="p-4 font-bold text-center text-4xl absolute right-0">
        <TiThMenu />
      </div>

      
      <div
        className="absolute top-0 left-0 w-full h-full bg-slate-800
          transform -translate-x-full opacity-0
          transition-all duration-500 ease-in-out
          group-hover:translate-x-0 group-hover:opacity-100 cursor-pointer"
      >
        <nav className="w-full h-full flex flex-col items-start justify-start p-4 gap-4">
          <Link
            to="/"
            className="text-xs w-[100px] hover:bg-slate-950 hover:text-indigo-300 transition duration-300 font-semibold py-1 border border-indigo-500 px-2 rounded-md"
          >
            Accueil
          </Link>

          
          {!token && (
            <Link
              to="/login"
              className="text-xs w-[100px] hover:bg-slate-950 hover:text-indigo-300 transition duration-300 font-semibold py-1 border border-indigo-500 px-2 rounded-md"
            >
              Connexion
            </Link>
          )}

          <Link
            to="/prets"
            className="text-xs w-[100px] hover:bg-slate-950 hover:text-indigo-300 transition duration-300 font-semibold py-1 border border-indigo-500 px-2 rounded-md"
          >
            Prêts
          </Link>
          <Link
            to="/nouveau"
            className="text-xs w-[100px] hover:bg-slate-950 hover:text-indigo-300 transition duration-300 font-semibold py-1 border border-indigo-500 px-2 rounded-md"
          >
            Nouveau
          </Link>
          <Link
            to="/bilan"
            className="text-xs w-[100px] hover:bg-slate-950 hover:text-indigo-300 transition duration-300 font-semibold py-1 border border-indigo-500 px-2 rounded-md"
          >
            Bilan
          </Link>

          
          {token && (
            <button
              onClick={handleLogout}
              className="text-xs text-red-500 w-[100px] cursor-pointer hover:bg-red-900 hover:text-slate-200 transition duration-300 font-semibold py-1 border border-indigo-500 px-2 rounded-md"
            >
              Déconnexion
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
