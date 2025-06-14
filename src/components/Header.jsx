import { Link } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";

function Header() {
  return (
    <header className="group w-[150px] h-screen bg-slate-900 py-4 cursor-pointer text-white sticky top-0 overflow-hidden">
    {/* Bouton ou trigger visible */}
    <div className="p-4 font-bold text-center text-4xl absolute right-0"><TiThMenu /></div>

    {/* Menu glissant depuis la gauche */}
    <div
      className="absolute top-0 left-0 w-full h-full bg-slate-800
      transform -translate-x-full opacity-0
      transition-all duration-500 ease-in-out
      group-hover:translate-x-0 group-hover:opacity-100 cursor-pointer"
    >
      <nav className="w-full h-full flex flex-col items-start justify-start p-4 gap-4">
        <Link to="/" className="hover:bg-slate-950 hover:text-amber-500 transition duration-300 font-semibold py-1 border border-blue-500 px-2 rounded-md">Accueil</Link>
        <Link to="/prets" className="hover:bg-slate-950 hover:text-amber-500 transition duration-300 font-semibold py-1 border border-blue-500 px-2 rounded-md">Prêts</Link>
        <Link to="/nouveau" className="hover:bg-slate-950 hover:text-amber-500 transition duration-300 font-semibold py-1 border border-blue-500 px-2 rounded-md">Nouveau</Link>
        <Link to="/bilan" className="hover:bg-slate-950 hover:text-amber-500 transition duration-300 font-semibold py-1 border border-blue-500 px-2 rounded-md">Bilan</Link>
      </nav>
    </div>
  </header>
  );
}

export default Header;

