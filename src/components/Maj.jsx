import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";

function Maj() {
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const token = localStorage.getItem("token");
    const [errorNumeroCompte, setErrorNumCompte] = useState(null);
    const [errorNomClient, setErrorNomClient] = useState(null);
    const [errorNomBanque, setErrorNomBanque] = useState(null);
    const [errorMontant, setErrorMontant] = useState(null);
    const [errorTaux, setErrorTaux] = useState(null);
    const [errorDate, setErrorDate] = useState(null);
    // const [pret, setPret] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

   



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
    
    useEffect(() => {
  const fetchPret = async () => {
    try {
      const response = await axios.get(`/api/prets/show/${params.Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      
      const pretData = response?.data?.pret;

      if (pretData) {
        setFormData({
          numeroCompte: pretData.numeroCompte ?? "",
          nomClient: pretData.nomClient ?? "",
          nomBanque: pretData.nomBanque ?? "",
          montant: pretData.montant ?? 0,
          taux: pretData.taux_de_pret ?? 0,
          date: pretData.date_de_pret ?? "",
        });
        console.log("Données chargées dans formData :", formData);

        console.log("Prêt récupéré :", pretData);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des prêts :", error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  fetchPret();
}, [token, params.Id]);


    

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
            const res = await axios.put(`/api/prets/update/${params.Id}`, 
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
            navigate("/prets")
            

        } catch (error) {
            setSaved(false)
            console.log("error", error);


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
            {loading ? (
  <Spinner />
) : (
  <div className="w-full flex justify-start items-center flex-col mb-6">
    <h1 className="text-xl font-bold text-black text-center mt-6 uppercase">
      Mis à jour du Prêt
    </h1>
    <form
      onSubmit={submitdata}
      method="post"
      className="w-[70%] md:w-[50%] mt-6 flex flex-col gap-3"
    >
      {/* Numero de compte */}
      <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
        <label
          htmlFor="numeroCompte"
          className="text-indigo-400 text-sm font-semibold"
        >
          Numero de compte
        </label>
        <input
          type="text"
          id="numeroCompte"
          onChange={onChange}
          autoFocus
          value={numeroCompte}
          placeholder="Entrer le numero de compte"
          className="px-2 py-1 border-2 border-gray-500 rounded-lg text-gray-700 outline-none focus:border-indigo-400"
        />
        {errorNumeroCompte && (
          <span className="text-red-500 text-xs">{errorNumeroCompte}</span>
        )}
      </div>

      {/* Nom de client */}
      <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
        <label
          htmlFor="nomClient"
          className="text-indigo-400 text-sm font-semibold"
        >
          Nom de Client
        </label>
        <input
          type="text"
          id="nomClient"
          onChange={onChange}
          value={nomClient}
          placeholder="Taper le nom complet du client"
          className="px-2 py-1 border-2 border-gray-500 rounded-lg text-gray-700 outline-none focus:border-indigo-400"
        />
        {errorNomClient && (
          <span className="text-red-500 text-xs">{errorNomClient}</span>
        )}
      </div>

      {/* Banques */}
      <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
        <label
          htmlFor="nomBanque"
          className="text-indigo-400 text-sm font-semibold"
        >
          Nom du Banque
        </label>
        <select
          onChange={onChange}
          id="nomBanque"
          value={nomBanque}
          className="bg-gray-300 px-2 py-1 border-2 border-gray-500 text-gray-700 rounded-lg outline-none focus:border-indigo-400"
        >
          {/* <option>Quel est votre banque</option> */}
          <option value="BOA">BOA</option>
          <option value="BCM">BCM</option>
          <option value="BNI">BNI</option>
          <option value="BFV">BFV</option>
          <option value="Acces banque">Accès Banque</option>
        </select>
        {errorNomBanque && (
          <span className="text-red-500 text-xs">{errorNomBanque}</span>
        )}
      </div>

      {/* Montant */}
      <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
        <label
          htmlFor="montant"
          className="text-indigo-400 text-sm font-semibold"
        >
          Montant en Ariary
        </label>
        <input
          type="number"
          id="montant"
          onChange={onChange}
          value={montant}
          placeholder="Montant"
          className="px-2 py-1 border-2 border-gray-500 rounded-lg text-gray-700 outline-none focus:border-indigo-400"
        />
        {errorMontant && (
          <span className="text-red-500 text-xs">{errorMontant}</span>
        )}
      </div>

      {/* Taux */}
      <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
        <label
          htmlFor="taux"
          className="text-indigo-400 text-sm font-semibold"
        >
          Taux (%)
        </label>
        <input
          type="number"
          id="taux"
          onChange={onChange}
          value={taux}
          placeholder="Taux de prêt"
          className="px-2 py-1 border-2 border-gray-500 rounded-lg text-gray-700 outline-none focus:border-indigo-400"
        />
        {errorTaux && (
          <span className="text-red-500 text-xs">{errorTaux}</span>
        )}
      </div>

      {/* Date de prêt */}
      <div className="w-full lg:max-w-[60%] mx-auto flex flex-col">
        <label
          htmlFor="date"
          className="text-indigo-400 text-sm font-semibold"
        >
          Date de Prêt
        </label>
        <input
          type="date"
          id="date"
          onChange={onChange}
          value={date}
          placeholder="Date de prêt"
          className="px-2 py-1 border-2 border-gray-500 rounded-lg text-gray-700 outline-none focus:border-indigo-400"
        />
        {errorDate && (
          <span className="text-red-500 text-xs">{errorDate}</span>
        )}
      </div>

      <div className="w-full lg:max-w-[60%] mx-auto">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 font-bold w-[150px] py-1 px-2 rounded-lg text-white cursor-pointer transition duration-500"
        >
          {saved ? (
            <div className="flex gap-3 justify-center">
              <p>Enregistrement...</p>
            </div>
          ) : (
            "Modifier"
          )}
        </button>
      </div>
    </form>
  </div>
)}

        </>
    )
}

export default Maj;