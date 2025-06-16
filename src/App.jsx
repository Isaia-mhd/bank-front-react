import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Pret from './components/Pret';
import Nouveau from './components/Nouveau';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bilan from './components/Bilan';
import Login from './components/Login';
import PrivateRoute from "./hooks/PrivateRoute";


function App() {
  return (
    <>
      <div className="h-full bg-dark flex bg-slate-800 gap-4">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/prets" element={<PrivateRoute element={<Pret />} />} />

            <Route path="/nouveau" element={<PrivateRoute element={<Nouveau />} />} />

            <Route path="/bilan" element={<PrivateRoute element={<Bilan />} />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      </div>

    </>
  );
}

export default App;
