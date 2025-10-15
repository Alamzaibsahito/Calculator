"use client"
import { useEffect, useState } from "react";

export default function Calculator() {
    const [result, setResult] = useState("")
    const [expression, setExpression] = useState("")

    const handleButtonClick = (value: string) => {
        if (value === "=") {
            try {
                const evalResult = eval(expression).toString();
                setResult(`${expression}=${evalResult}`);
                setExpression(evalResult);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setResult("Error");
            }
        } else if (value === "C") {
            setResult("");
            setExpression("");
        } else if (value === "⌫") {
            setExpression((prevExpression) => prevExpression.slice(0, -1));
        } else if (value === "CE") {
            setExpression((prev) => {
                const parts = prev.split(/([+\-*/])/)
                parts.pop();
                return parts.join("");
            })
        }
        else {
            setExpression((prevExpression) => prevExpression + value);
        }
    };

    // keyboard setup
    useEffect(()=>{
        const handleKeyPress =(e:KeyboardEvent) =>{
            const allowedKeys ='0123456789+-*/.=()';
            
            if(allowedKeys.includes(e.key)){
                e.preventDefault();
                handleButtonClick(e.key);
            }else if (e.key ==="Enter"){
                e.preventDefault();
                handleButtonClick("=")
            }else if (e.key === "Backspace"){
                e.preventDefault();
                handleButtonClick("⌫");
            }else if (e.key ==="Escape"){
                e.preventDefault();
                handleButtonClick("C");
            }
        };

        window.addEventListener("keydown",handleKeyPress);
        return() =>{
            window.removeEventListener("keydown",handleKeyPress);
        };
    })
    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "=", "+",
        "C", "⌫", "CE",
    ]
    return (
        <main className=" flex min-h-screen flex-col items-center py-20">
            <h1 className=" text-4xl text-blue-400 font-semibold mb-8">Calculator</h1>
            <div className="bg-pink-400 p-2 rounded-3xl shadow-2xl">
                <input
                    className="w-full text-1xl border-b-2  border-black-200 "
                    type="text"
                    value={expression}
                    readOnly
                />
                <input
                    className="w-full text-1xl border-b-2 mb-2 border-black-200 "
                    type="text"
                    value={result}
                    readOnly
                />
                <div className="grid grid-cols-4 gap-1">
                    {buttons.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => handleButtonClick(btn)}
                            className={`text-2xl ${btn === "C"
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-red-400 hover:bg-gray-600"
                                } text-white rounded-lg p-2`}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </main>
    )
}