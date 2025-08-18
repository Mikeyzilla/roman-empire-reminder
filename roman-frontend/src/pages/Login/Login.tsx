import { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import type { LoginStreak } from "../../LoginStreak/LoginStreak";
import NarrativeScroll from "../../NarrativeScroll/NarrativeScroll";

function Login() {
    type Visibility = "visible" | "hidden";
    const streakWindowTime = 6 * 60 * 60 * 1000;

    const [emperorSpeech, setEmperorSpeech] = useState(
        "I am told you requested audience. State your name, citizen."
    );

    const [infoLabelText, setInfoLabelText] = useState("Enter your name, citizen!");
    const [processStage, setProcessStage] = useState(0);

    const [redGlare, showRedGlare] = useState(false);

    const [enteredUserName, setEnteredUserName] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const [associatedInput, showAssociatedInput] = useState(false);
    const [inputType, setInputType] = useState<"text" | "password">("text");

    const [overlayVisibility, setOverlayVisibility] = useState<Visibility>("hidden");
    const [submitText, setSubmitText] = useState("SUBMIT");

    const [hideScroll, setHideScroll] = useState(true);

    const navigate = useNavigate();

    const timeoutsRef = useRef<number[]>([]);
    const setLater = (fn: () => void, ms: number) => {
        const id = window.setTimeout(fn, ms);
        timeoutsRef.current.push(id);
        return id;
    };

    const clearAllTimers = () => {
        timeoutsRef.current.forEach((id) => clearTimeout(id));
        timeoutsRef.current = [];
    };

    useEffect(() => {
        const id1 = setLater(() => setOverlayVisibility("visible"), 3000);
        const id2 = setLater(() => {
            setHideScroll(false);
            showAssociatedInput(true);
        }, 3400);
        return () => {
            clearTimeout(id1);
            clearTimeout(id2);
        };
    }, []);

    useEffect(() => {
        showAssociatedInput(false);
    }, [infoLabelText]);

    const AngryEmperor = () => {
        clearAllTimers();
        setHideScroll(true);
        setOverlayVisibility("hidden");
        showRedGlare(true);
        setEmperorSpeech("Guards! Seize them!");
        setLater(() => navigate("/"), 2000);
    };

    const RomanLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (processStage === 0) {
            // username step
            if (!enteredUserName) {
                alert("You must enter a username!");
                return;
            }

            try {
                const userNameAttempt = await fetch("http://localhost:5000/getUserName", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: enteredUserName }),
                });

                if (userNameAttempt.ok) {
                    alert("Success! We found a username in our system.");
                } else {
                    AngryEmperor();
                    return;
                }
            } catch (err) {
                console.error("Error checking username:", err);
                AngryEmperor();
                return;
            }

            setOverlayVisibility("hidden");
            setEmperorSpeech("Very well. Whisper the secret code.");
            setHideScroll(true);

            setLater(() => {
                setInfoLabelText("Enter your secret code below:");
                setEnteredPassword("");
                setInputType("password");
                setSubmitText("LOGIN");

                setOverlayVisibility("visible");

                setLater(() => {
                    setHideScroll(false);
                    showAssociatedInput(true);
                }, 400);
            }, 4000);

            setProcessStage(1);
        } else if (processStage === 1) {

            if (!enteredPassword) {
                AngryEmperor();
                return;
            }

            try {
                const loginAttempt = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: enteredUserName,
                        password: enteredPassword,
                    }),
                });

                if (loginAttempt.ok) {
                    const { token } = await loginAttempt.json();
                    localStorage.setItem("romanEmpireToken", token);

                    setOverlayVisibility("hidden");
                    setEmperorSpeech("Ah — so I do remember you. Proceed.");


                    if (localStorage.getItem("UserStreak")) {
                        const userLoginStreak: LoginStreak = JSON.parse(
                            localStorage.getItem("UserStreak")!
                        );
                        userLoginStreak.count++;
                        userLoginStreak.timeStarted = Date.now();
                        userLoginStreak.timeItExpires =
                            userLoginStreak.timeStarted + streakWindowTime;
                        localStorage.setItem("UserStreak", JSON.stringify(userLoginStreak));
                    } else {
                        const userStreak: LoginStreak = {
                            count: 1,
                            timeStarted: Date.now(),
                            timeItExpires: Date.now() + streakWindowTime,
                        };
                        localStorage.setItem("UserStreak", JSON.stringify(userStreak));
                    }

                    setLater(() => {
                        navigate("/roman-empire");
                    }, 4000);
                } else {

                    try {
                        await loginAttempt.json();
                    } catch { }
                    AngryEmperor();
                }
            } catch (err) {
                AngryEmperor();
            }
        }
    };

    return (
        <main className={`LoginContainer ${redGlare ? "angry" : ""}`}>
            <div className="EmperorSpeechBubble">
                <p className="EmperorSpeech" id="EmperorSpeech">
                    {emperorSpeech}
                </p>
            </div>

            <div
                id="overlay"
                className="overlay"
                style={{ visibility: overlayVisibility }}
            ></div>

            {!redGlare ? (
                <div className="RedGlare" aria-hidden />
            ) : (
                <>
                    <div className="LeftEye"></div>
                    <div className="RightEye"></div>
                </>
            )}

            {!hideScroll && (
                <NarrativeScroll
                    narration={infoLabelText}
                    onTextComplete={() => showAssociatedInput(true)}
                >
                    {associatedInput && (
                        <>
                            <input
                                type={inputType}
                                className="enterField"
                                id="enterField"
                                value={processStage === 0 ? enteredUserName : enteredPassword}
                                onChange={(e) =>
                                    processStage === 0
                                        ? setEnteredUserName(e.target.value)
                                        : setEnteredPassword(e.target.value)
                                }
                            />
                            <button className="nextButton" id="nextButton" onClick={RomanLogin}>
                                {submitText}
                            </button>
                        </>
                    )}
                </NarrativeScroll>
            )}
        </main>
    );
}

export default Login;
