import axios from "axios";
import { useEffect, useState } from "react";
import { FaPen, FaSave, FaTrash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale('fr');

function Pret() {
    const token = localStorage.getItem("token");
    const [prets, setPrets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
   

    useEffect(() => {
        const fetchPrets = async () => {
            try {
                const response = await axios.get("/api/prets", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const pretsData = response?.data?.prets;

                if (pretsData) {
                    setPrets(pretsData);
                    console.log("Prêts récupérés :", pretsData);
                } else {
                    console.warn("Aucun prêt trouvé dans la réponse.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des prêts :", error);
                toast.error("Verifier le serveur")
            }
        };

        fetchPrets();
        setTimeout(() => {
            setLoading(false)
        }, 500)

    }, [token]);

    const SupprimerPret = async (pretId, e) => {
        e.preventDefault();
        try {
            if (confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
                const sup = await axios.delete(`/api/prets/delete/${pretId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const newPrets = prets.filter(pret => pret.id !== pretId);
                setPrets(newPrets);
                toast.success(sup.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.status === 404) {
                toast.error("Prêt n'existe plus");
            }
        }
    }

    const maj = async (pretId, e) => {
        e.preventDefault();
       navigate(`/modification/${pretId}`);
    }

    return (
        <>
            {loading ? <Spinner /> : (
                <div className="min-h-screen text-gray-800 bg-gray-300 p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">Tous les prêts</h1>
                    <form>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-300 border rounded-lg overflow-hidden shadow">
                                <thead className="bg-sky-100">
                                    <tr className="text-sm text-sky-600">
                                        <th className="text-left px-4 py-2">Numéro de compte</th>
                                        <th className="text-left px-4 py-2">Nom du Client</th>
                                        <th className="text-left px-4 py-2">Nom de la Banque</th>
                                        <th className="text-left px-4 py-2">Intérêt</th>
                                        <th className="text-left px-4 py-2">Montant</th>
                                        <th className="text-left px-4 py-2">Date</th>
                                        <th className="text-left px-4 py-2">Total</th>
                                        <th className="text-left px-4 py-2">Modifier</th>
                                        <th className="text-left px-4 py-2">Suppression</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(prets).map(([key, pret]) => (
                                        <tr key={key} className="border-t border-gray-200 hover:bg-sky-50 cursor-pointer transition text-sm">
                                            <td className="px-4 py-2 font-medium">
                                              
                                                    <p className="w-[150px]">{pret.numeroCompte}</p>
                                                
                                            </td>

                                            <td className="px-4 py-2">
                                                
                                                    <p className="truncate w-[150px]">{pret.nomClient}</p>
                                                
                                            </td>

                                            <td className="px-4 py-2">
                                               
                                                    <p className="w-[80px]">{pret.nomBanque}</p>
                                                
                                            </td>

                                            <td className="px-4 py-2">
                                               <p className="w-[80px]">{pret.taux_de_pret} %</p>
                                              
                                            </td>

                                            <td className="px-4 py-2">
                                                
                                                    <p className="w-[100px]">{Math.round(pret.montant * 100) / 100} Ar</p>
                                               
                                            </td>

                                            <td className="px-4 py-2 font-medium">
                                                
                                                    <p className="w-[150px]">{dayjs(pret.date_de_pret).format('D MMMM YYYY')}</p>
                                             
                                            </td>

                                            <td className="px-4 py-2 font-medium">{Math.round(pret.totalPayer * 100) / 100}</td>

                                            <td className="px-4 py-2 text-emerald-500">
                                                
                                                    <FaPen
                                                        onClick={(e) => maj(pret.id, e) }
                                                        className="cursor-pointer hover:text-sky-600"
                                                    />
                                                
                                            </td>

                                            <td className="px-4 py-2 text-red-500">
                                                <button type="button" onClick={(e) => SupprimerPret(pret.id, e)}>
                                                    <FaTrash className="cursor-pointer hover:text-red-600" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default Pret;
