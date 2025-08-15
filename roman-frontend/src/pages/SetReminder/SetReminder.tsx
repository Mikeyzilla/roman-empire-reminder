import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SetReminder.css"

function SetReminder() {
  const [thinkDialogue, setThinkDialogue] = useState(
    "I know I live in the Roman Empire... but I always forget how cool it is to be here! I wish there was a way I could set up a reminder... WAIT!"
  );
  const [thinkStyle, setThinkStyle] = useState({ top: "", right: "", fontSize: "" });

  const [showPopup, setShowPopup] = useState(false);

  const [desiredRemainingDays, setDesiredRemainingDays] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => {
      setThinkDialogue(
        "I'm in the perfect place to set a reminder! All I have to do is enter the amount of days I want to set before the next time I log in!"
      );
      setThinkStyle({ top: "28%", right: "26%", fontSize: "17px" });
    }, 4000);

    const t2 = setTimeout(() => {
      setShowPopup(true);
    }, 8000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const backHome = () => {
    navigate("/roman-empire");
  };

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
        setShowPopup(false);
        alert(`Reminder set successfully for ${remainingDays} days!`);
        setThinkDialogue(
          "Perfect! Now that it's set, as long as I log in before that time, I'll keep being reminded about our awesome Empire!"
        );
        setTimeout(() => {
          setThinkDialogue("I can't imagine what'd happen if I missed the reminder though....");
          setThinkStyle({ top: "30%", right: "27%", fontSize: "17px" });
        }, 6000);
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
    <main className="ReminderContainer">
      <div className="thinkArea">
        <div className="thinkBubble"></div>
        <p
          className="thinkDialogue"
          id="thinkDialogue"
          style={{ position: "absolute", ...thinkStyle }}
        >
          {thinkDialogue}
        </p>
      </div>

      <div className="MainLink" id="MainLink" onClick={backHome}></div>

      {showPopup && <div id="overlay" className="overlay"></div>}

      {showPopup && (
        <div className="daysPopUpArea" id="daysPopUpArea">
          <label className="daysLabel" id="daysLabel">
            Days before Sudden Doom...
          </label>
          <input
            type="number"
            min="1"
            className="enterBox"
            id="enterBox"
            value={desiredRemainingDays}
            onChange={(e) => setDesiredRemainingDays(e.target.value)}
          />
          <button className="setButton" id="setButton" onClick={setDays}>
            SUBMIT
          </button>
        </div>
      )}
    </main>
  );
}

export default SetReminder;
