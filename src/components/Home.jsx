import axios from "axios";
import { useEffect } from "react";

function Home() {
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
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchAdmin();
  }, [token]);

  return (
    <div className="dark h-screen text-black px-6 py-10 font-sans flex justify-center  mx-auto">

        <h1 className="text-6xl font-bold text-center mt-[150px]">Bienvenue</h1>
      
    </div>
  );
}

export default Home;
