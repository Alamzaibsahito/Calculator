"use client"
import { useState } from "react";

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
        } else {
            setExpression((prevExpression) => prevExpression + value);
        }
    };

    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "=", "+",
        "C", "⌫",
    ]
    return (
        <main className="flex min-h-screen flex-col items-center py-10">
            <h1 className="text-4xl font-bold mb-10">Calculator</h1>
            <div className="bg-red-400 p-6 rounded-lg shadow-lg">
                <input
                    className="w-full text-1xl border-b-2 border-yellow-400 focus:outline-none"
                    type="text"
                    value={expression}
                    readOnly
                />
                <input
                    className="w-full text-1xl border-b-2 border-yellow-400 focus:outline-none"
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
                                : "bg-green-400 hover:bg-gray-600"
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