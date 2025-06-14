import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
import Spinner from "./Spinner";
dayjs.extend(relativeTime);
dayjs.locale('fr');
function Bilan() {
    const [loading, setLoading] = useState(true);
    const [bilan, setBilan] = useState([]);
    const [pret, setPret] = useState([])

    
    useEffect(() => {
        
        const bilan = async() => {
            try {
                const res = await axios.get("/api/bilan");
                const pret = await axios.get("/api/prets")
                setPret(pret.data.prets)
                // console.log(pret.data.prets);
                
                
                console.log(res.data.bilans);
                setBilan(res.data.bilans)
                
            } catch (error) {
                console.log(error);
                
            }
            
        }

        bilan();
        setTimeout(() => {
            setLoading(false)
        }, 1400)
    }, []) 

    return (
        <>
            {loading ? <Spinner /> : (
                <div className="dark w-full bg-gray-900 text-white min-h-screen px-6 py-10 font-sans">
                {/* Page Title */}
                <h1 className="text-3xl font-bold mb-2">Bilan</h1>
                <p className="text-gray-400 mb-10">Vue d’ensemble des prêts bancaires</p>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-300 mb-1">Total Prets à Payer</h2>
                        <p className="text-3xl font-bold text-green-400">{bilan.totalAPayer} ar</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-300 mb-1">Prêt Maximum</h2>
                        <p className="text-3xl font-bold text-yellow-400">{bilan.maxAPayer} ar</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-300 mb-1">Prêt Minimum</h2>
                        <p className="text-3xl font-bold text-red-400">{bilan.minAPayer} ar</p>
                    </div>
                </div>

                {/* Optional Recent Requests */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4">Dernières prêts</h2>
                    <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                        <table className="w-full table-auto text-left text-sm">
                            <thead className="text-gray-400 border-b border-gray-700">
                                <tr>
                                    <th className="py-2 px-4">Nom</th>
                                    <th className="py-2 px-4">Montant</th>
                                    <th className="py-2 px-4">Taux</th>
                                    <th className="py-2 px-4">à Payer</th>
                                    <th className="py-2 px-4">Date</th>
                                    <th className="py-2 px-4">Banque</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-800 hover:bg-gray-700">
                                    <td className="py-2 px-4">{pret[0]?.nomClient}</td>
                                    <td className="py-2 px-4">{pret[0]?.montant} ar</td>
                                    <td className="py-2 px-4">{pret[0]?.taux_de_pret} %</td>
                                    <td className="py-2 px-4">{pret[0]?.totalPayer} ar</td>
                                    <td className="py-2 px-4">{dayjs(pret[0]?.date_de_pret).format('D MMMM YYYY')}</td>
                                    <td className="py-2 px-4">{pret[0]?.nomBanque}</td>
                                </tr>
                                <tr className="border-b border-gray-800 hover:bg-gray-700">
                                    <td className="py-2 px-4">{pret[1]?.nomClient}</td>
                                    <td className="py-2 px-4">{pret[1]?.montant} ar</td>
                                    <td className="py-2 px-4">{pret[1]?.taux_de_pret} %</td>
                                    <td className="py-2 px-4">{pret[1]?.totalPayer} ar</td>
                                    <td className="py-2 px-4">{dayjs(pret[1]?.date_de_pret).format('D MMMM YYYY')}</td>
                                    <td className="py-2 px-4">{pret[1]?.nomBanque}</td>
                                </tr>
                                <tr className="hover:bg-gray-700">
                                    <td className="py-2 px-4">{pret[2]?.nomClient}</td>
                                    <td className="py-2 px-4">{pret[2]?.montant} ar</td>
                                    <td className="py-2 px-4">{pret[2]?.taux_de_pret} %</td>
                                    <td className="py-2 px-4">{pret[2]?.totalPayer} ar</td>
                                    <td className="py-2 px-4">{dayjs(pret[2]?.date_de_pret).format('D MMMM YYYY')}</td>
                                    <td className="py-2 px-4">{pret[2]?.nomBanque}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Bilan;