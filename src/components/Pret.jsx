import axios from "axios";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
import Spinner from "./Spinner";
dayjs.extend(relativeTime);
dayjs.locale('fr');
function Pret() {
    const token = localStorage.getItem("token");
    const [prets, setPrets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        numeroCompte: "",
        nomClient: "",
        nomBanque: "",
        montant: 0,
        taux: 0,
        date: ""
    });

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
            }
        };

        fetchPrets();
        setTimeout(() => {
            setLoading(false)
        }, 500)


    }, [token]);


    const SupprimerPret = async (pretId, e) => {

        e.preventDefault();
        console.log(pretId);
        try {
            if (confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
                const sup = await axios.delete(`/api/prets/delete/${pretId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(sup.data.message);
                const newPrets = prets.filter(pret => pret.id != pretId)
                setPrets(newPrets);
                toast.success(sup.data.message)
            }
            

        } catch (error) {
            console.log(error);
            if (error.status == 404) {
                console.log("Prets n'exite plus");
                toast.error("Prets n'exite plus")
            }
        }
    }

    const modifier = async (pretId) => {
        try {
            const mod = await axios.put(`/api/prets/update/${pretId}`,
                {
                    numeroCompte: formData.numeroCompte,
                    nomClient: formData.nomClient,
                    nomBanque: formData.nomBanque,
                    montant: formData.montant,
                    taux_de_pret: formData.taux,
                    date_de_pret: formData.date
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPrets((prevPrets) =>
                prevPrets.map((pret) =>
                    pret.id === pretId ? mod.data.pret : pret
                )
            );
            toast.success(mod.data.message)
            console.log(mod);

        } catch (error) {
             toast.error("Erreur", error)
        }
    }



    return (
        <>
            {loading ? <Spinner /> : (
                <div className="min-h-screen text-white p-6 ">
                    <h1 className="text-2xl font-bold mb-6">Détails du prêt</h1>
                    <form className="">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                                <thead className="bg-gray-700">
                                    <tr className="text-sm">
                                        {/* <th className="text-left px-4 py-2">Identifiant</th> */}
                                        <th className="text-left px-4 py-2">Compte</th>
                                        <th className="text-left px-4 py-2">Client</th>
                                        <th className="text-left px-4 py-2">Banque</th>
                                        <th className="text-left px-4 py-2">Taux</th>
                                        <th className="text-left px-4 py-2">Montant (Ar)</th>
                                        <th className="text-left px-4 py-2">Date</th>
                                        <th className="text-left px-4 py-2">Total</th>
                                        <th className="text-left px-4 py-2">Modifier</th>
                                        <th className="text-left px-4 py-2">Suprression</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(prets).map(([key, pret]) => (
                                        <tr key={key} className="border-t border-gray-700 hover:bg-gray-700 cursor-pointer transition text-sm">
                                            {/* <td className="px-4 py-2 font-medium capitalize">{pret.id}</td> */}
                                            {/* numCompte */}
                                            <td className="px-4 py-2 font-medium capitalize">
                                                {editId === pret.id ? (
                                                    <input type="text" className="px-1 outline-none border-1 rounded-sm w-[150px]" value={formData.numeroCompte} id="numCompte" onChange={(e) => setFormData({ ...formData, numeroCompte: e.target.value })} />

                                                ) : (
                                                    <p className="w-[150px]">{pret.numeroCompte}</p>
                                                )}
                                            </td>

                                            {/* nomClient */}
                                            <td className="px-4 py-2">
                                                {editId === pret.id ? (
                                                    <input type="text" className="px-1 outline-none border-1 rounded-sm w-[150px]" value={formData.nomClient} id="nomClient" onChange={(e) => setFormData({ ...formData, nomClient: e.target.value })} />

                                                ) : (
                                                    <p className="truncate w-[150px]">{pret.nomClient}</p>
                                                )}
                                            </td>

                                            {/* Banque */}
                                            <td className="px-4 py-2">
                                                {editId === pret.id ? (
                                                    <select onChange={(e) => setFormData({ ...formData, nomBanque: e.target.value })} id="nomBanque" value={formData.nomBanque} className="px-1 outline-none border-1 rounded-sm w-[80px] bg-gray-700">
                                                        <option value="BNI">BNI</option>
                                                        <option value="Acces banque">Accès Banque</option>
                                                        <option value="BFV">BFV</option>
                                                        <option value="BOA">BOA</option>
                                                    </select>
                                                ) : (
                                                    <p className="w-[80px]">{pret.nomBanque}</p>
                                                )}
                                            </td>
                                            {/* Taux de pret */}
                                            <td className="px-4 py-2">
                                                {editId === pret.id ? (
                                                    <input type="number" className="px-1 outline-none border-1 rounded-sm w-[50px]" value={formData.taux} id="taux" onChange={(e) => setFormData({ ...formData, taux: e.target.value })} />

                                                ) : (
                                                    <p className="w-[50px]">{pret.taux_de_pret} %</p>
                                                )}
                                            </td>

                                            {/* Montant */}
                                            <td className="px-4 py-2">
                                                {editId === pret.id ? (
                                                    <input type="number" className="px-1 outline-none border-1 rounded-sm w-[100px]" value={formData.montant} id="montant" onChange={(e) => setFormData({ ...formData, montant: e.target.value })} />

                                                ) : (
                                                    <p className="w-[100px]">{Math.round(pret.montant * 100) / 100}</p>
                                                )}
                                            </td>

                                            {/* date de pret */}
                                            <td className="px-4 py-2 font-medium capitalize">
                                                {editId === pret.id ? (
                                                    <input type="date" className="px-1 outline-none border-1 rounded-sm w-[150px]" value={formData.date} id="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />

                                                ) : (

                                                    <p className="w-[150px]">{dayjs(pret.date_de_pret).format('D MMMM YYYY')}</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 font-medium capitalize">{Math.round(pret.totalPayer * 100) / 100}</td>
                                            <td className="px-4 py-2 text-green-600">
                                                {editId === pret.id ? (
                                                    <div className="flex gap-2">
                                                        <FaSave
                                                            onClick={() => {
                                                                modifier(pret.id);
                                                                setEditId(null);
                                                            }}
                                                            className="cursor-pointer text-amber-600"
                                                        />
                                                        <MdCancel onClick={() => setEditId(null)} className="cursor-pointer text-red-600" />
                                                    </div>

                                                ) : (
                                                    <FaPenToSquare
                                                        onClick={() => {
                                                            setFormData({
                                                                numeroCompte: pret.numeroCompte,
                                                                nomClient: pret.nomClient,
                                                                nomBanque: pret.nomBanque,
                                                                montant: pret.montant,
                                                                taux: pret.taux_de_pret,
                                                                date: pret.date_de_pret
                                                            });
                                                            setEditId(pret.id);
                                                        }}
                                                        className="cursor-pointer"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-red-600 "><button type="button" onClick={(e) => SupprimerPret(pret.id, e)}><FaRegTrashCan className="cursor-pointer" /></button></td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            )}

        </>
    )
}

export default Pret;