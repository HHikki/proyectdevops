export default function Button({children, onClick}){
    return(
        <button
            onClick={onClick}
            className="bg-amber-200 text-black py-5 px-3.5 rounded-2xl"
        >
            {children}
        </button>
    );
}