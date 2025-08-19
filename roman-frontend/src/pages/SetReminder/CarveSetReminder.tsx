import { useEffect, useRef, useState } from "react"; // NEW
import NarrativeScroll from "../../NarrativeScroll/NarrativeScroll";
import "./CarveSetReminder.css";
import { useNavigate } from "react-router-dom";

function CarveSetReminder() {
  const initialIntro =
    "As you approach the Roman Monolith, a sudden burst of imagination comes upon you. \n \n You begin to hear thoughts in your head. \n \n They tell you that you have come upon the Mystical Monolith of Memory. \n \n All you have to do is enter the amount of days you want to set before the next time you log in!";

  const [narrativeQueue, setNarrativeQueue] = useState<string[]>([initialIntro]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [scrollKey, setScrollKey] = useState(0);
  const [doneTalking, setDoneTalking] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [desiredRemainingDays, setDesiredRemainingDays] = useState("");

  // NEW: countdown state
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [timerStatus, setTimerStatus] = useState<"idle" | "loading" | "timerActive" | "timerFailure">("idle");
  const tickRef = useRef<number | null>(null); // interval id

  const navigate = useNavigate();

  const handleNarrationComplete = () => {
    if (queueIndex < narrativeQueue.length - 1) {
      setQueueIndex((i) => i + 1);
      setScrollKey((k) => k + 1);
      return;
    }
    if (doneTalking) {
      navigate("/roman-empire");
      return;
    }
    if (!showPopup) {
      setTimeout(() => setShowPopup(true), 300);
    }
  };

  const formatRemaining = (ms: number) => {
    const clamped = Math.max(0, ms);
    const totalSeconds = Math.floor(clamped / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return { days, hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
  };

  useEffect(() => {
    if (!showPopup) {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
      setRemainingMs(null);
      setTimerStatus("idle");
      return;
    }

    let cancelled = false;
    const token = localStorage.getItem("romanEmpireToken");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchRemaining = async () => {
      try {
        setTimerStatus("loading");
        const res = await fetch("http://localhost:5000/getRemainingDays", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 401) {
          localStorage.removeItem("romanEmpireToken");
          navigate("/");
          return;
        }
        if (!res.ok) {
          setTimerStatus("timerFailure");
          setRemainingMs(0);
          return;
        }
        const data = await res.json();
        if (cancelled) return;

        if (data.timerStatus === "timerActive" && typeof data.remainingTime === "number") {
          setTimerStatus("timerActive");
          setRemainingMs(data.remainingTime);

          if (tickRef.current) clearInterval(tickRef.current);
          tickRef.current = window.setInterval(() => {
            setRemainingMs((prev) => {
              if (prev == null) return prev;
              const next = prev - 1000;
              if (next <= 0) {
                if (tickRef.current) {
                  clearInterval(tickRef.current);
                  tickRef.current = null;
                }
                setTimerStatus("timerFailure");
                return 0;
              }
              return next;
            });
          }, 1000) as unknown as number;
        } else {
          setTimerStatus("timerFailure");
          setRemainingMs(0);
        }
      } catch (e) {
        setTimerStatus("timerFailure");
        setRemainingMs(0);
      }
    };

    fetchRemaining();

    return () => {
      cancelled = true;
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [showPopup, navigate]);

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

        const postSubmitQueue = [
          "You get the feeling that as long as you login before the reminder time, you'll be in tip top shape.",
          "I can't imagine what'd happen if you missed the reminder though....",
        ];

        setShowPopup(false);         
        setNarrativeQueue(postSubmitQueue);
        setQueueIndex(0);
        setScrollKey((k) => k + 1);
        setDoneTalking(true);
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

  const time = remainingMs != null ? formatRemaining(remainingMs) : null;

  return (
    <div className="CarvingBackground">
      {!showPopup && (
        <NarrativeScroll
          key={scrollKey}
          narration={narrativeQueue[queueIndex]}
          onTextComplete={handleNarrationComplete}
        />
      )}

      {showPopup && (
        <form
          className="ReminderForm"
          onSubmit={(e) => {
            e.preventDefault();
            setDays();
          }}
        >
          {/* NEW: Countdown header */}
          <h1 className="CountdownHeading">
            {timerStatus === "loading" && "Fetching your remaining time…"}
            {timerStatus === "timerActive" && time
              ? `Time until reminder: ${time.days}d ${time.hours}:${time.minutes}:${time.seconds}`
              : null}
            {timerStatus === "timerFailure" && "No active reminder (or it has expired)."}
          </h1>

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
    </div>
  );
}

export default CarveSetReminder;

