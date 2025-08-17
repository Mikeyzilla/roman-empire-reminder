import { useNavigate } from "react-router-dom";
import "./DisplayRomanEmpire.css";
import { useEffect, useState, useRef } from "react";
import funfactsJson from "../../funfacts/FunFacts.json";
import type { FunFacts } from "../../funfacts/FunFacts";

type UIStage = "default" | "defeated" | "forgiven";

function DisplayRomanEmpire() {
  const [isTimerActive, setIsTimerActive] = useState<boolean | null>(null);
  const [stage, setStage] = useState<UIStage>("default");
  const [index, setIndex] = useState(0);
  const funFactFilter = localStorage.getItem("funFactsFilter");
  const navigate = useNavigate();

  const facts: FunFacts[] = funfactsJson as FunFacts[];
  const displayedFacts = funFactFilter
    ? facts.filter(f => f.category === funFactFilter)
    : facts;

  const fun_fact = displayedFacts[index % displayedFacts.length];
  const inactivityTimer = useRef<number | null>(null);

  const resetInactivityTimer = () => {
   
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = window.setTimeout(() => {
      showRandomFact();
    }, 30000);
  };

  const showRandomFact = () => {
    setIndex((prevIndex) => {
      let newIndex = prevIndex;
      while (newIndex === prevIndex && displayedFacts.length > 1) {
        newIndex = Math.floor(Math.random() * displayedFacts.length);
      }
      return newIndex;
    });
    resetInactivityTimer();
  };

  const previousFact = () => {
    setIndex((factIndex) => {
      if (factIndex <= 0) return displayedFacts.length - 1;
      return factIndex - 1;
    });
    resetInactivityTimer();
  };

  const nextFact = () => {
    setIndex((factIndex) => {
      if (factIndex >= displayedFacts.length - 1) return 0;
      return factIndex + 1;
    });
    resetInactivityTimer();
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("romanEmpireToken");
      if (!token) {
        alert("You are not logged in!");
        navigate("/");
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/getRemainingDays", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        setIsTimerActive(data?.timerStatus === "timerActive");
      } catch (e) {
        console.error(e);
        alert("Network error—please try again.");
      }
    })();
  }, [navigate]);

  useEffect(() => {
    const timers: number[] = [];

    if (isTimerActive === true) {
      setStage("default");
    } else if (isTimerActive === false) {
      setStage("defeated");
      const t1 = window.setTimeout(() => setStage("forgiven"), 7000);
      const t2 = window.setTimeout(() => setStage("default"), 14000);
      timers.push(t1, t2);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isTimerActive]);

  
  useEffect(() => {
    if (stage === "default") {
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [stage]);

  const goToSetReminder = () => {
    navigate("/set-reminder");
  };

  const quizTime = () => {
    navigate("/personality-quiz");
  }

  const logOut = () => {
    try {
      localStorage.removeItem("romanEmpireToken");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(String(err));
    }
  };

  return (
    <main className="MainContainer">
      <div className="MainHeader">
        <div className="Toolbar">
          {stage === "default" && (
            <>
              <div
                className="SettingsIcon"
                onClick={isTimerActive ? goToSetReminder : undefined}
              />
              <div className="PersonalityQuiz" onClick={isTimerActive ? quizTime : undefined }/>
              <div
                className="LogoutButton"
                id="logOutWalkWay"
                onClick={isTimerActive ? logOut : undefined}
              />
            </>
          )}
        </div>
      </div>

      {stage === "default" && (
        <div className="MainBody">
          <div className="SelectableImageViewer" id="SelectableImageViewer">
            <h1 className="ImageTitle" id="ImageTitle">
              {fun_fact.title}
            </h1>
            <img
              src={fun_fact.src}
              style={{width: fun_fact.title === "Marcus my words..." ?
                "320px" : fun_fact.title === "A Brawl of a Lifetime" ?
                "320px"
                : "420px",
                height: fun_fact.title === "Marcus my words..." ?
                "200px" : fun_fact.title === "A Brawl of a Lifetime" ?
                "200px" : "380px",
                top: fun_fact.title === "Marcus my words..." ?
                "46%" : fun_fact.title === "A Brawl of a Lifetime" ? 
                "46%" :
                "37%",
                right: fun_fact.title === "Marcus my words..." ? "39%" : fun_fact.title === "A Brawl of a Lifetime" ?
                "39%" : "36%"
              }}
              className="SelectableImage"
              id="SelectableImage"
            />
            <p className="ImageDescription" id="ImageDescription">
              {fun_fact.desc}
            </p>

            <div onClick={previousFact} className="LeftArrow"></div>
            <div onClick={nextFact} className="RightArrow"></div>
          </div>
        </div>
      )}

      {stage === "defeated" && (
        <div
          className="DefeatedAndForgivenessArea"
          id="DefeatedAndForgivenessArea"
        >
          <h1 className="DefeatedAndForgivenessTitle">
            The Empire is saddened by your forgetfulness
          </h1>
          <img src="images/ThoughtBubble.png" className="DefeatedThoughts" />
          <p className="DefeatedAndForgivenessText">
            I have failed my brethren by forgetting our glory…
          </p>
        </div>
      )}

      {stage === "forgiven" && (
        <div
          className="DefeatedAndForgivenessArea"
          id="DefeatedAndForgivenessArea"
        >
          <h1 className="DefeatedAndForgivenessTitle">
            Don’t worry! You are forgiven.
          </h1>
          <img src="images/ThoughtBubble.png" className="DefeatedThoughts" />
          <p className="DefeatedAndForgivenessText">
            Mike and Marcel are glad you came back to their app.
          </p>
        </div>
      )}
    </main>
  );
}

export default DisplayRomanEmpire;
