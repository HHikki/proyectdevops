export default function Button_({children, onClick}){
    return(
        <button
            onClick={onClick}
            className="bg-cyan-800 text-white py-5 px-3.5 rounded-2xl"
        >
            {children}
        </button>
    );
}