import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
import Spinner from "./Spinner";
import BilanMultiLineChart from "./BilanLineChart";

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
            console.log(pret);
            
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => setLoading(false), 1400);
        }
    };

        fetchBilan();
    }, [pret, token]);

    return (
        <>
            {loading ? <Spinner /> : (
                <div className="dark w-full bg-gray-300 min-h-screen px-6 py-10 font-sans">
                    <h1 className="text-xl text-center text-black mb-2 uppercase font-bold">Bilan</h1>

                    <div className="w-full flex justify-between items-start">
                        {/* Stat Cards */}

                        {global && (
                        <div className="w-[20%] flex flex-col gap-6 mt-10 justify-center items-center">
                            <div className="w-[240px] bg-sky-400 p-2 rounded-lg shadow-md">
                            <h2 className="text-md font-semibold text-gray-300 mb-1">Prêt Total</h2>
                            <p className="text-lg font-bold text-slate-800">
                                {parseFloat(global.total).toLocaleString('fr-FR')} ar
                            </p>
                            </div>

                            <div className="w-[240px] bg-emerald-500 p-2 rounded-lg shadow-md">
                            <h2 className="text-md font-semibold text-gray-300 mb-1">Prêt Maximum</h2>
                            <p className="text-lg font-bold text-slate-800">
                                {parseFloat(global.max).toLocaleString('fr-FR')} ar
                            </p>
                            </div>

                            <div className="w-[240px] bg-amber-500 p-2 rounded-lg shadow-md">
                            <h2 className="text-md font-semibold text-gray-300 mb-1">Prêt Minimum</h2>
                            <p className="text-lg font-bold text-slate-800">
                                {parseFloat(global.min).toLocaleString('fr-FR')} ar
                            </p>
                            </div>
                        </div>
                        )}

                        {/* GRAPHIQUE */}
                        <div className="w-[70%] mt-12">
                            <h2 className="text-2xl font-semibold mb-4">Tendance mensuelle des prêts</h2>
                            <BilanMultiLineChart dataBilan={bilan} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Bilan;
