import axios from "axios";
import { useState } from "react";
import logo from "../assets/bank.jpg";
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
        <div className="w-full flex justify-start items-center flex-col">
            <div class="w-full flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">

                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:w-[30%] border-1 border-gray-300 py-4 px-4 rounded-xl">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img class="mx-auto h-20 w-auto rounded-full" src={logo} alt="Logo" />
                        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200">Connexion</h2>
                    </div>
                    
                    <form class="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" class="block text-sm/6 font-medium text-gray-200">Email</label>
                            <div class="mt-2">
                            <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" class="block w-full rounded-md bg-slata-800 px-3 py-1.5 text-base text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                            {errorEmail ? <span className="text-red-500 text-xs">{errorEmail}</span> : ""} { }
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                            <label htmlFor="password" class="block text-sm/6 font-medium text-gray-200">mot de passe</label>
                        
                            </div>
                            <div class="mt-2">
                            <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" class="block w-full rounded-md bg-slata-800 px-3 py-1.5 text-base text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                            {errorPassword ? <span className="text-red-500 text-xs">{errorPassword}</span> : ""} { }
                        </div>

                        <div>
                            <button type="submit" class="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

        </>
    )

}

export default Login;