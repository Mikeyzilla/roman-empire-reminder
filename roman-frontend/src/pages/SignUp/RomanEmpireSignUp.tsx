import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AngryBackground from "../../../public/images/NotSignedUp.png"
import "./RomanEmpireSignUp.css";

export default function RomanEmpireSignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);
  const [soldierDialogue, setSoldierDialogue] = useState("It looks like you are not signed up, soldier!");
  const [userNameStrengthMessage, setUserNameStrengthMessage] = useState("Your username");
  const [userNameStrengthColor, setUserNameStrengthColor] = useState("red");
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("Your password");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("red");
  const [signedMessage, setSignedMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userInteracted) return;
    const id = setTimeout(() => {
      setSoldierDialogue("Join the Legion! Give me your name!");
    }, 5000);
    return () => clearTimeout(id);
  }, [userInteracted]);


  const strongUserNameChecker = (userName: string) => {
    if (userName.length <= 7) {
        setUserNameStrengthMessage("Your name must be at least 8 characters long!");
        setUserNameStrengthColor("red");
        return false;
    } else {
        setUserNameStrengthMessage("That's a great name!");
        setUserNameStrengthColor("green");
        return true;
    }
  };

  const strongPasswordChecker = (password: string) => {
        if (password.length < 9) {
            setPasswordStrengthMessage("You need a password that contains at least 9 characters");
            setPasswordStrengthColor("red");
            return false;
        } else if (!/[!@\$%&*]/.test(password)) {
            setPasswordStrengthMessage("Your password needs at least one special character (!, @, $, %, &, *)");
            setPasswordStrengthColor("red");
            return false;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordStrengthMessage("Your password needs at least one uppercase character");
            setPasswordStrengthColor("red");
            return false;
        } else {
            setPasswordStrengthMessage("Your password is stronger than Arnold!");
            setPasswordStrengthColor("green");
            return true;
        }
    };

  const checkIfSigned = (name: string, pass: string) => {
    const nameOk = strongUserNameChecker(name);
    const passOk = strongPasswordChecker(pass);

    if (name.length >= 1 && pass.length >= 1 && nameOk && passOk) {
      setSoldierDialogue("Excellent work! Click the stamp below and get out of my sight!");
      setSignedMessage("SIGNED");
    } else {
      setSignedMessage("");
    }
  };

  const enlistNow = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.length >= 1 && password.length >= 1) {
      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("romanEmpireToken", data.token);
          setSignedMessage("SIGNED");

          setTimeout(() => {
            navigate("/roman-empire");
          }, 2000);
        } else {
          alert("Registration failed: " + (data.message || data.error));
        }
      } catch (err: any) {
        alert("Error: " + err.message);
      }
    } else {
      setSoldierDialogue("Halt! You forgot your name and / or password!");
    }
  };



  const handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);

    if (!userInteracted) setUserInteracted(true);

    if (value.length >= 1) {
      setSoldierDialogue("Very good recruit! Now Augustus requires your password!");
    }

    strongUserNameChecker(value);
    checkIfSigned(value, password);
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    if (!userInteracted) setUserInteracted(true);

    strongPasswordChecker(value);
    checkIfSigned(username, value);
  };

  return (
    <main className="SignUpContainer">
    <img className="SignUp-Image" src={AngryBackground}/>
      <div className="TitleThoughts"style={{
          width:
            soldierDialogue === "Very good recruit! Now Augustus requires your password!" ||
            soldierDialogue === "Excellent work! Click the stamp below and get out of my sight!"
              ? "300px"
              : "325px",
          height:
            soldierDialogue === "Very good recruit! Now Augustus requires your password!" ||
            soldierDialogue === "Excellent work! Click the stamp below and get out of my sight!"
              ? "300px"
              : "325px",
          left:
            soldierDialogue === "Very good recruit! Now Augustus requires your password!" ||
            soldierDialogue === "Excellent work! Click the stamp below and get out of my sight!"
              ? "10%"
              : "9%",
          top: 
            soldierDialogue === "Very good recruit! Now Augustus requires your password!" ||
            soldierDialogue === "Excellent work! Click the stamp below and get out of my sight!"
              ? "-3%"
              : "-3%",
        }}>
        <p className="SoldierDialogue" id="dialogueBubble" style={{
           top: 
            soldierDialogue === "It looks like you are not signed up, soldier!"
            ? "28%"
            : soldierDialogue === "Join the Legion! Give me your name!"
            ? "20%"
            : "27%",
           width: 
            soldierDialogue === "It looks like you are not signed up, soldier!"
            ? "300px" : "250px",
           fontSize:
            soldierDialogue === "It looks like you are not signed up, soldier!"
            ? "26px" 
            : soldierDialogue === "Join the Legion! Give me your name!"
            ? "32px" 
            : "20px",
           left:
           soldierDialogue === "It looks like you are not signed up, soldier!"
           ? "5%" 
           : soldierDialogue === "Join the Legion! Give me your name!" 
           ? "12%"
           : "10%"
        }}
        >{soldierDialogue}</p>
      </div>

      <form id="signUpForm" className="signUpForm" onSubmit={enlistNow}>
        <label className="UserNameLabel">Mark thyself in the Scroll of Citizens</label>
        <input type="text" id="RomanID" className="UserNameField" name="username" value={username}
        onChange={handleUsernameInput} required />
        <p className="userNameStrengthLabel" style={{ color: userNameStrengthColor }}>
          {userNameStrengthMessage}
        </p>
        <label className="PasswordLabel">Seal your Allegiance with a Code</label>
        <p></p>
        <input type="password" id="RomanPassword" className="PasswordField" name="password" value={password}
        onChange={handlePasswordInput} required />
        <div className="GapThree"></div>
        <p className="passwordStrengthLabel" style={{color: passwordStrengthColor,
          marginLeft: passwordStrengthMessage === "Your password needs at least one special character (!, @, $, %, &, *)"
          ? "8%" : "0%",
        }}>{passwordStrengthMessage}</p>
        <p className="SubmitTitle">Pledge thy Loyalty</p>
        <div className="SubmitArea">
          <div className="SubmitField" id="signedArea"></div>
          <label className="SIGNED">{signedMessage}</label>
          <button type="submit" id="MoveOnButton" 
          style={{marginRight: signedMessage === "" ? "-5%" : "5%",
            marginTop: signedMessage === "" ? "2%" : "2%"
          }}className="SealButton"></button>
        </div>
      </form>
    </main>
  );
}
