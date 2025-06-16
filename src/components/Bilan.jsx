import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
import Spinner from "./Spinner";
import BilanMultiLineChart from "./BilanLineChart";
import BilanLine from "./BilanLine";

dayjs.extend(relativeTime);
dayjs.locale('fr');

function Bilan() {
    const [loading, setLoading] = useState(true);
    const [bilan, setBilan] = useState([]);
    const [pret, setPret] = useState([]);
    const [global, setGlobal] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
       
        const fetchBilan = async () => {
        try {
            const res = await axios.get("/api/bilan", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const pretRes = await axios.get("/api/prets", {
                    headers: { Authorization: `Bearer ${token}` },
            });

            setPret(pretRes.data.prets || []);
            setBilan(res.data.bilan_mensuel);
            setGlobal(res.data.global);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => setLoading(false), 1400);
        }
    };

        fetchBilan();
    }, [token]);

    return (
        <>
            {loading ? <Spinner /> : (
                <div className="dark w-full bg-gray-900 text-white min-h-screen px-6 py-10 font-sans">
                    <h1 className="text-3xl font-bold mb-2">Bilan</h1>
                    <p className="text-gray-400 mb-10">Vue d’ensemble des prêts bancaires</p>

                    {/* Stat Cards */}

                    {global && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-300 mb-1">Total Global à Payer</h2>
                        <p className="text-3xl font-bold text-green-400">
                            {parseFloat(global.total).toLocaleString('fr-FR')} ar
                        </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-300 mb-1">Prêt Maximum Global</h2>
                        <p className="text-3xl font-bold text-yellow-400">
                            {parseFloat(global.max).toLocaleString('fr-FR')} ar
                        </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-300 mb-1">Prêt Minimum Global</h2>
                        <p className="text-3xl font-bold text-red-400">
                            {parseFloat(global.min).toLocaleString('fr-FR')} ar
                        </p>
                        </div>
                    </div>
                    )}


                    {/* Derniers prêts */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-4">Derniers prêts</h2>
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
                                    {pret.slice(0, 3).map((item, i) => (
                                        <tr key={i} className="border-b border-gray-800 hover:bg-gray-700">
                                            <td className="py-2 px-4">{item.nomClient}</td>
                                            <td className="py-2 px-4">{item.montant} ar</td>
                                            <td className="py-2 px-4">{item.taux_de_pret} %</td>
                                            <td className="py-2 px-4">{item.totalPayer} ar</td>
                                            <td className="py-2 px-4">{dayjs(item.date_de_pret).format('D MMMM YYYY')}</td>
                                            <td className="py-2 px-4">{item.nomBanque}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* GRAPHIQUE */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-4">Évolution mensuelle</h2>
                        <BilanMultiLineChart dataBilan={bilan} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Bilan;
