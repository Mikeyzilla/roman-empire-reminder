import { useEffect, useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
function Login() {
    type Visibility = 'visible' | 'hidden';

    const [emperorSpeech, setEmperorSpeech] = useState("I was made aware of your presence. Now, then. What is your name?");
    const [infoLabelText, setInfoLabelText] = useState("Enter your name, citizen!");
    const [processStage, setProcessStage] = useState(0);
    const [enteredUserName, setEnteredUserName] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [inputType, setInputType] = useState<'text' | 'password'>('text');
    const [popUpWindowVisibility, setPopUpWindowVisibility] = useState<Visibility>("hidden");
    const [overlayVisibility, setOverlayVisibility] = useState<Visibility>("hidden");
    const [submitText, setSubmitText] = useState("SUBMIT");
    const navigate = useNavigate();
    useEffect(() => {
    const t = setTimeout(() => {
        setPopUpWindowVisibility("visible");
        setOverlayVisibility("visible");
    }, 4000);
    return () => clearTimeout(t);
    }, []);
    
    const RomanLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (processStage === 0) {
        
        if (!enteredUserName) {
            alert("You must enter a username!");
            return;
        }

        try {
            const userNameAttempt = await fetch("http://localhost:5000/getUserName", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: enteredUserName })
            });

            if (userNameAttempt.ok) {
            alert("Success! We found a username in our system.");
            } else {
            alert("There wasn't a username in our system with that name.");
            return;
            }
        } catch (err) {
            console.error("Error checking username:", err);
            alert("Network error—please try again.");
            return;
        }

        
        setPopUpWindowVisibility("hidden");
        setOverlayVisibility("hidden");
        setEmperorSpeech("Very well. Do you know the secret code?");

        setTimeout(() => {
            setInfoLabelText("Enter your secret code below:");
            setEnteredPassword("");
            setInputType("password");
            setSubmitText("LOGIN");
            setPopUpWindowVisibility("visible");
            setOverlayVisibility("visible");
        }, 4000);

        setProcessStage(1);

        } else if (processStage === 1) {
        
        if (!enteredPassword) {
            alert("Please enter a password.");
            return;
        }

        try {
            const loginAttempt = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: enteredUserName,
                password: enteredPassword
            })
            });

            if (loginAttempt.ok) {
            const { token } = await loginAttempt.json();   

            localStorage.setItem("romanEmpireToken", token);

            setPopUpWindowVisibility("hidden");
            setOverlayVisibility("hidden");
            setEmperorSpeech("Congratulations, I do know you. Welcome in");

            setTimeout(() => {
                navigate("/roman-empire");
            }, 4000);

            } else {
            const err = await loginAttempt.json();
            alert(err.error || "Login failed—check your credentials.");
            }

        } catch (err) {
            console.error("Login error:", err);
            alert("Network error—please try again.");
        }
    }};


    return (
        <main className="LoginContainer">
            <div className="EmperorSpeechBubble">
                <p className="EmperorSpeech" id="EmperorSpeech">
                {emperorSpeech}
                </p>
            </div>

            <div id="overlay" className="overlay" style={{ visibility: overlayVisibility }}></div>

            <div className="loginPopUp" id="loginPopup" style={{visibility: popUpWindowVisibility}}>
                <label className="nameLabel" id="nameLabel">
                {infoLabelText}
                </label>
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
                <button className="nextButton" id="nextButton" onClick={RomanLogin}>{submitText}</button>
            </div>
        </main>
    );
}
export default Login;