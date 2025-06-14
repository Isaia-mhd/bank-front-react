import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import wait from "../assets/wait.svg";

function Nouveau() {
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false)
    const [formData, setFormData] = useState({
        numeroCompte: "",
        nomClient: "",
        nomBanque: "",
        montant: 0,
        taux: 0,
        date: ""
    });

    const {
        numeroCompte,
        nomClient,
        nomBanque,
        montant,
        taux,
        date,
    } = formData;
    setTimeout(() => {
        setLoading(false)
    }, 500)

    const onChange = (e) => {
        e.preventDefault();
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const submitdata = async(e) => {
        setSaved(true)
        e.preventDefault();
        try {
            const res = await axios.post("/api/prets/store", 
                {
                    numeroCompte: formData.numeroCompte,
                    nomClient : formData.nomClient,
                    nomBanque: formData.nomBanque,
                    montant: formData.montant,
                    taux_de_pret: formData.taux,
                    date_de_pret: formData.date
                }
            );
            console.log(res);
            toast.success(res.data.message)
            setSaved(false)
            formData.date = "";
            formData.nomClient = "";
            formData.numeroCompte = "";
            formData.taux = "";
            formData.montant = "";
            formData.nomBanque = "";

        } catch (error) {
            toast.error(error?.message)
            setSaved(false)
            console.log(error);
            
        }
    }

    
    return (
        <>
            {loading ? <Spinner /> : (<div className="w-full flex justify-start items-center flex-col">
            <h1 className="text-2xl text-amber-400">Ajouter Nouveau Pret</h1>
            <form onSubmit={submitdata} method="post" className="w-full max-w-[70%] mt-6 flex flex-col gap-3">
                {/* Numero de compte */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="numeroCompte" className="text-white font-semibold">Numero de compte</label>
                    <input type="text" id="numeroCompte" onChange={onChange} value={numeroCompte} placeholder="Numero de Compte"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                </div>
                {/* Nom de client */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="nomClient" className="text-white font-semibold">Nom de Client</label>
                    <input type="text" id="nomClient" onChange={onChange} value={nomClient} placeholder="Nom de Client"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                </div>

                {/* Banques */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="nomBanque"  className="text-white font-semibold">Banque</label>
                    <select onChange={onChange} id="nomBanque" value={nomBanque} className="bg-slate-800 px-2 py-1 border-2 border-blue-500 text-gray-400 rounded-lg outline-none focus:border-amber-400">
                        <option value="BNI">BNI</option>
                        <option value="BFV">BFV</option>
                        <option value="BOA">BOA</option>
                    </select>
                </div>

                {/* Montant */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="montant" className="text-white font-semibold">Montant (Ariary)</label>
                    <input type="number" id="montant" onChange={onChange} value={montant} placeholder="Montant"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                </div>

                {/* Taux */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="taux" className="text-white font-semibold">Taux (%)</label>
                    <input type="number" id="taux" onChange={onChange} value={taux} placeholder="Taux de prêt"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                </div>

                {/* Date de prêt */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="date" className="text-white font-semibold">Date de Prêt</label>
                    <input type="date" id="date" onChange={onChange} value={date} placeholder="Date de prêt"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                </div>

                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <button type="submit" className=" bg-blue-500 py-1 px-2 rounded-lg text-white cursor-pointer  transition duration-500">{saved ? (<div className="flex gap-3 justify-center">
                        <p>Enregistrement...</p>
                        <img src={wait} alt="waiting..."  className="w-[20px] h-[20px]"/>
                    </div>) : "Enregistrer"} </button>
                </div>
            </form>
        </div>)}
        </>
    )
}

export default Nouveau;