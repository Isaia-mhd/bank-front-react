import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import wait from "../assets/wait.svg";

function Nouveau() {
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const token = localStorage.getItem("token");
    const [errorNumeroCompte, setErrorNumCompte] = useState(null);
    const [errorNomClient, setErrorNomClient] = useState(null);
    const [errorNomBanque, setErrorNomBanque] = useState(null);
    const [errorMontant, setErrorMontant] = useState(null);
    const [errorTaux, setErrorTaux] = useState(null);
    const [errorDate, setErrorDate] = useState(null);



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
        setErrorNumCompte(null);
        setErrorNomClient(null);
        setErrorNomBanque(null);
        setErrorMontant(null);
        setErrorTaux(null);
        setErrorDate(null);
        try {
            const res = await axios.post("/api/prets/store", 
                {
                    numeroCompte: formData.numeroCompte,
                    nomClient : formData.nomClient,
                    nomBanque: formData.nomBanque,
                    montant: formData.montant,
                    taux_de_pret: formData.taux,
                    date_de_pret: formData.date
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
            setSaved(false)
            console.log(error);


            if (error.response.data.errors?.numeroCompte) {
                setErrorNumCompte(error.response.data.errors["numeroCompte"]);
            } else if (error.response.data.errors?.nomClient) {
                setErrorNomClient(error.response.data.errors["nomClient"]);
            }else if (error.response.data.errors?.montant) {
                setErrorMontant(error.response.data.errors["montant"]);
            } else if(error.response.data.errors?.date_de_pret) {
                setErrorDate(error.response.data.errors["date_de_pret"]);
            } else if(error.response.data.errors?.taux_de_pret) {
                setErrorTaux(error.response.data.errors["taux_de_pret"]);
            } else{
                setErrorNomBanque(error.response.data.errors["nomBanque"]);
            }
            
        }
    }

    
    return (
        <>
            {loading ? <Spinner /> : (<div className="w-full flex justify-start items-center flex-col">
            <h1 className="text-2xl text-white">Ajouter Nouveau Pret</h1>
            <form onSubmit={submitdata} method="post" className="w-full max-w-[70%] mt-6 flex flex-col gap-3">
                {/* Numero de compte */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="numeroCompte" className="text-white font-semibold">Numero de compte</label>
                    <input type="text" id="numeroCompte" onChange={onChange} autoFocus value={numeroCompte} placeholder="Numero de Compte"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                    {errorNumeroCompte && <span className="text-red-500 text-xs">{errorNumeroCompte}</span> } { }
                </div>
                {/* Nom de client */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="nomClient" className="text-white font-semibold">Nom de Client</label>
                    <input type="text" id="nomClient" onChange={onChange} value={nomClient} placeholder="Nom de Client"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                    {errorNomClient && <span className="text-red-500 text-xs">{errorNomClient}</span> } { }

                </div>

                {/* Banques */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="nomBanque"  className="text-white font-semibold">Banque</label>
                    <select onChange={onChange} id="nomBanque" value={nomBanque} className="bg-slate-800 px-2 py-1 border-2 border-blue-500 text-gray-400 rounded-lg outline-none focus:border-amber-400">
                        <option>Choisir votre banque</option>
                        <option value="BNI">BNI</option>
                        <option value="Acces banque">Accès Banque</option>
                        <option value="BFV" selected>BFV</option>
                        <option value="BOA">BOA</option>
                    </select>
                    {errorNomBanque && <span className="text-red-500 text-xs">{errorNomBanque}</span> } { }

                </div>

                {/* Montant */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="montant" className="text-white font-semibold">Montant (Ariary)</label>
                    <input type="number" id="montant" onChange={onChange} value={montant} placeholder="Montant"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                    {errorMontant && <span className="text-red-500 text-xs">{errorMontant}</span> } { }

                </div>

                {/* Taux */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="taux" className="text-white font-semibold">Taux (%)</label>
                    <input type="number" id="taux" onChange={onChange} value={taux} placeholder="Taux de prêt"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                    {errorTaux && <span className="text-red-500 text-xs">{errorTaux}</span> } { }

                </div>

                {/* Date de prêt */}
                <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
                    <label htmlFor="date" className="text-white font-semibold">Date de Prêt</label>
                    <input type="date" id="date" onChange={onChange} value={date} placeholder="Date de prêt"  className="px-2 py-1 border-2 border-blue-500 rounded-lg text-gray-200 outline-none focus:border-amber-400"/>
                    {errorDate && <span className="text-red-500 text-xs">{errorDate}</span> } { }

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