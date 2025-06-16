import axios from "axios";
import { useState } from "react";
import logo from "../assets/logo.avif";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);

    const location = useLocation();
    const from = location.state?.from || "/";

    const onSubmit = async(e) => {
    e.preventDefault();

    setErrorEmail(null);
    setErrorPassword(null);

    try {
        const response = await axios.post("/api/login", { email, mot_de_passe: password });
        console.log(response);
        toast.success(response.data.message);

        localStorage.setItem("token", response.data.token);

        navigate(from, { replace: true });
        
    } catch (error) {
        console.log(error.response.data);

        if (error.response.data.errors?.email) {
            setErrorEmail(error.response.data.errors["email"]);
        } else if (error.response.data.errors?.mot_de_passe) {
            setErrorPassword(error.response.data.errors["mot_de_passe"]);
        } else {
            setErrorPassword(error.response.data.message);
        }
    }
}

    
    return (
        <> 
       <div className="w-full min-h-screen bg-gray-300 flex justify-center items-center flex-col">
  <div className="w-full flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:w-[30%] bg-white py-6 px-6 rounded-xl shadow-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-30 w-auto rounded-full" src={logo} alt="Logo" />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-800">Connexion</h2>
      </div>

      <form className="space-y-6 mt-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-2">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
          {errorEmail && <span className="text-red-500 text-xs">{errorEmail}</span>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <div className="mt-2">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
          {errorPassword && <span className="text-red-500 text-xs">{errorPassword}</span>}
        </div>

        <div>
          <button
            type="submit"
            className="cursor-pointer flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

        </>
    )

}

export default Login;