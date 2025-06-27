
interface SquareProps {
    value: 'X' | 'O' | null;
    onSquareClick: () => void;
}

export default function Square({ value, onSquareClick }: SquareProps)  {

    return (
        <button className="square w-20 h-20 text-4xl font-bold border border-gray-400 flex items-center justify-center bg-white"
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}
