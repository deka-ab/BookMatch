type ButtonProps = {
    onClick: () => void;
    text: string;
}; 

export default function Button({ onClick, text }: ButtonProps) {
    return(
        <button onClick={onClick}>
            {text}
        </button>
    );
}