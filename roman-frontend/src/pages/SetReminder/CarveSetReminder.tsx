import { useState } from "react";
import NarrativeScroll from "../../NarrativeScroll/NarrativeScroll";
import "./CarveSetReminder.css";
import { useNavigate } from "react-router-dom";

type Stage = "intro" | "form" | "confidentSpeech" | "ominousSpeech";

function CarveSetReminder() {
  const introText =
    "As you approach the Roman Monolith, a sudden burst of imagination comes upon you. \n \n You begin to hear thoughts in your head. \n \n They tell you that you have come upon the Mystical Monolith of Memory. \n \n All you have to do is enter the amount of days you want to set before the next time you log in!";

  const confidentSpeech =
    "You get the feeling that as long as you login before the reminder time, you'll be in tip top shape.";

  const ominousSpeech =
    "I can't imagine what'd happen if you missed the reminder though...";

  const [stage, setStage] = useState<Stage>("intro");
  const [desiredRemainingDays, setDesiredRemainingDays] = useState("");

  const navigate = useNavigate();

  const setDays = async () => {
    const remainingDays = desiredRemainingDays.trim();
    if (!/^\d+$/.test(remainingDays) || Number(remainingDays) <= 0) {
      alert("Please enter a positive number of days.");
      return;
    }

    const token = localStorage.getItem("romanEmpireToken");
    if (!token) {
      alert("You're not logged in!");
      navigate("/");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/setRemainingDays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ numberOfDays: remainingDays }),
      });

      if (res.ok) {
        await res.json();
        setStage("confidentSpeech");
      } else if (res.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("romanEmpireToken");
        navigate("/");
      } else {
        alert("Failed to set reminder. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error—please try again.");
    }
  };

  return (
    <div className="CarvingBackground">
      {stage === "intro" && (
        <NarrativeScroll
          key="intro"
          narration={introText}
          onTextComplete={() => setStage("form")}
        />
      )}

      {stage === "form" && (
        <form
          className="ReminderForm"
          onSubmit={(e) => {
            e.preventDefault();
            setDays();
          }}
        >
          <div className="fieldRow">
            <label className="CarveLabel" htmlFor="heroName">
              Etch your name here, hero!
            </label>
            <input id="heroName" type="text" className="textInput" />
          </div>

          <div className="fieldRow">
            <label className="daysLabel" htmlFor="enterBox">
              Days before Sudden Doom…
            </label>
            <input
              id="enterBox"
              type="number"
              min="1"
              className="enterBox"
              value={desiredRemainingDays}
              onChange={(e) => setDesiredRemainingDays(e.target.value)}
            />
          </div>

          <div className="CyberDial" aria-hidden="true" />

          <button className="setButton" id="setButton" type="submit">
            SUBMIT
          </button>
        </form>
      )}

      {stage === "confidentSpeech" && (
        <NarrativeScroll
          key="confidentSpeech"
          narration={confidentSpeech}
          onTextComplete={() => setStage("ominousSpeech")}
        />
      )}

      {stage === "ominousSpeech" && (
        <NarrativeScroll
          key="ominousSpeech"
          narration={ominousSpeech}
          onTextComplete={() => navigate("/funfactshowcase")}
        />
      )}
    </div>
  );
}

export default CarveSetReminder;
