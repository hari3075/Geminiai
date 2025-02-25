import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
    const context = useContext(Context);

    if (!context) {
        return <p>Loading...</p>;
    }

    const { onSent, showResult, loading, resultData, setInput, input, recentPrompt } = context;

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User" />
            </div>

            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="great">
                            <p>
                                <span>Hello, Dev</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>

                        <div className="cards">
                            <div className="card" onClick={() => onSent("Suggest beautiful places in the world")}>
                                <p>Suggest beautiful places in the world</p>
                                <img src={assets.compass_icon} alt="Compass" />
                            </div>
                            <div className="card" onClick={() => onSent("Briefly summarize: Indian fighters")}>
                                <p>Briefly summarize: Indian fighters</p>
                                <img src={assets.bulb_icon} alt="Bulb" />
                            </div>
                            <div className="card" onClick={() => onSent("Suggest beautiful places in the world")}>
                                <p>Suggest beautiful places in the world</p>
                                <img src={assets.message_icon} alt="Message" />
                            </div>
                            <div className="card" onClick={() => onSent("Improve the readability of code")}>
                                <p>Improve the readability of code</p>
                                <img src={assets.code_icon} alt="Code" />
                            </div>
                        </div>
                    </> :
                    <div className="result">
                        <div className="title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ?
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Enter a prompt here"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div>
                            <label htmlFor="fileInput">
                                <img src={assets.gallery_icon} alt="Gallery" style={{ cursor: "pointer" }} />
                            </label>
                            <input type="file" id="fileInput" accept="image/*" style={{ display: "none" }} />

                            <img src={assets.mic_icon} alt="Microphone" />
                            {input ? <img
                                src={assets.send_icon}
                                alt="Send"
                                onClick={() => !loading && onSent(input)}
                                style={{ cursor: "pointer", opacity: loading ? 0.5 : 1 }}
                            /> : null}
                        </div>
                    </div>

                    <p className="bottom-info">
                        Display accurate info, including about people, so double-check its responses. Your privacy matters.
                    </p>
                </div>


                <div className="result-container">

                </div>

            </div>
        </div>
    );
};

export default Main;
