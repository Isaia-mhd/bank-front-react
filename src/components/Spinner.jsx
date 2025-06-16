import spinner from "../assets/spinner.svg";
function Spinner(){
    return (
        <div className="min-h-screen text-white p-6 w-full flex justify-center items-center bg-gray-300 mx-auto">
            <img src={spinner} alt="loading......" />
        </div>
    )
}

export default Spinner;