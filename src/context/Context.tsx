import { createContext, useState, ReactNode } from "react";
import runChat from "../config/geminiai";

type ContextType = {
    prevPrompts: string[];
    setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
    onSent: (prompt: string) => Promise<void>;
    setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
    recentPrompt: string;
    showResult: boolean;
    loading: boolean;
    resultData: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    input: string;
    newChat: () => void;

};

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [input, setInput] = useState<string>("");
    const [recentPrompt, setRecentPrompt] = useState<string>("");
    const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultData, setResultData] = useState<string>("");

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt?: string): Promise<void> => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let finalPrompt = prompt || input.trim();
        if (!finalPrompt) {
            setLoading(false);
            return;
        }

        setRecentPrompt(finalPrompt);

        setPrevPrompts((prev) => {
            if (!prev.includes(finalPrompt)) {
                return [...prev, finalPrompt];
            }
            return prev;
        });

        const response = await runChat(finalPrompt);

        let formattedResponse = response
            .split("**")
            .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part))
            .join("")
            .split("*")
            .join("<br>");

        let words = formattedResponse.split(" ");
        words.forEach((word, i) => {
            setTimeout(() => {
                setResultData((prev) => prev + word + " ");
            }, 75 * i);
        });

        setLoading(false);
        setInput("");
    };

    const contextValue: ContextType = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        newChat
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
