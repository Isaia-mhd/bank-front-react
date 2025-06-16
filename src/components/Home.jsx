import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("admin est: ", res.data);
        setAdmin(res.data.admin);
      } catch (error) {
        console.log(error.response?.data);
        setError(error.response?.data?.message || "Une erreur s'est produite.");
      }
    };

    fetchAdmin();
  }, [token]);

  return (
    <div className="dark text-white px-6 py-10 font-sans flex justify-center items-center mx-auto">

      {admin ? <div>
          <h1 className="text-6xl font-bold text-center mt-6">Bienvenue, {admin.name}</h1>
        </div> : <h1 className="text-6xl text-center font-bold">Prêt Bancaire</h1>}
    </div>
  );
}

export default Home;
