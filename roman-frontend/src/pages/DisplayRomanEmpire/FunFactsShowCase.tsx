import { useEffect, useState } from "react";
import "./FunFactsShowCase.css";
import funfactsJson from "../../funfacts/FunFacts.json";
import type { FunFacts } from "../../funfacts/FunFacts";
import { useNavigate } from "react-router-dom";
import NarrativeScroll from "../../NarrativeScroll/NarrativeScroll";

function FunFactsShowCase() {
  const [hoveredCalendar, setHoveredCalendar] = useState(false);
  const [hoveredStatue, setHoveredStatue] = useState(false);
  const [hoveredColosseum, setHoveredColosseum] = useState(false);
  const [specificTitle, setSpecificTitle] = useState("");
  const [specificNarraration, setSpecificNarration] = useState("");
  const [specificImage, setSpecificImage] = useState("");
  const [doneTalking, setDoneTalking] = useState(false);
  const [oneScrollShowing, setOneScrollShowing] = useState(false);
  const [specificStage, setSpecificStage] = useState<"default" | "defeated" | "forgiven">("default");
  const [showMarcus, setShowMarcus] = useState(true);
  const [showColosseum, setShowColosseum] = useState(true);
  const [showCalendar, setShowCalendar] = useState(true);
  const [isTimerActive, setIsTimerActive] = useState<boolean | null>(null);

  const funFactFilter = localStorage.getItem("funFactsFilter");
  const navigate = useNavigate();
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
      setSpecificStage("default");
    } else if (isTimerActive === false) {
      setSpecificStage("defeated");
      const t1 = window.setTimeout(() => setSpecificStage("forgiven"), 7000);
      const t2 = window.setTimeout(() => setSpecificStage("default"), 14000);
      timers.push(t1, t2);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isTimerActive]);

  const facts: FunFacts[] = funfactsJson as FunFacts[];

  const displayCorrectShowCase = (needle: string) => {
    const match = facts.find((fact) =>
      fact.desc.toLowerCase().includes(needle.toLowerCase())
    );
    if (match) showSpecificFact(match);
  };

  const isOneScrollShowing = (target: "calendar" | "statue" | "colosseum") => {
    setHoveredCalendar(target === "calendar");
    setHoveredStatue(target === "statue");
    setHoveredColosseum(target === "colosseum");
    setOneScrollShowing(true);
    setDoneTalking(false);
  };

  const showSpecificFact = (matchingFact: FunFacts) => {
    setSpecificTitle(matchingFact.title);
    setSpecificNarration(matchingFact.desc);
    setSpecificImage(matchingFact.src);
  };

  const allowMouseLeave = () => {
    setDoneTalking(true);
  };

  const goToSetReminder = () => {
    navigate("/set-reminder");
  };

  const takePersonalityQuiz = () => {
    navigate("/personality-quiz");
  };

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
    <div className="ShowCasePage" data-stage={specificStage}>
      <div className="ShowCaseLeft">
        <div className="LogoutButton" onClick={logOut}></div>
        <div className="PersonalityButton" onClick={takePersonalityQuiz}></div>
      </div>

      <div
        className="ShowCaseCenter"
        data-stage={specificStage}
        style={{
          backgroundImage:
            specificStage === "default" ? 'url("/images/ShowCaseBackground.png")' : "none",
        }}
      >
        {specificStage === "default" && (
          <>
            <div
              className="Calendar"
              onMouseEnter={() => {
                isOneScrollShowing("calendar");
                displayCorrectShowCase("Calendar");
              }}
              onMouseLeave={() => {
                if (doneTalking) {
                  setHoveredCalendar(false);
                  setOneScrollShowing(false);
                }
              }}
            >
              {hoveredCalendar && (
                <div className="DisplayAreaCalendar">
                  <NarrativeScroll
                    narration={`${specificTitle}\n\n${specificNarraration}`}
                    onTextComplete={allowMouseLeave}
                  >
                    <div
                      className="CalendarImage"
                      style={{ backgroundImage: `url(${specificImage})` }}
                    />
                  </NarrativeScroll>
                </div>
              )}
            </div>

            <div
              className="Marcus"
              onMouseEnter={() => {
                isOneScrollShowing("statue");
                displayCorrectShowCase("Marcus");
              }}
              onMouseLeave={() => {
                if (doneTalking) {
                  setHoveredStatue(false);
                  setOneScrollShowing(false);
                }
              }}
            >
              {hoveredStatue && (
                <div className="DisplayAreaStatue">
                  <NarrativeScroll
                    narration={`${specificTitle}\n\n${specificNarraration}`}
                    onTextComplete={allowMouseLeave}
                  >
                    <div
                      className="StatueImage"
                      style={{ backgroundImage: `url(${specificImage})` }}
                    />
                  </NarrativeScroll>
                </div>
              )}
            </div>

            <div
              className="Colosseum"
              onMouseEnter={() => {
                isOneScrollShowing("colosseum");
                displayCorrectShowCase("Colosseum");
              }}
              onMouseLeave={() => {
                if (doneTalking) {
                  setHoveredColosseum(false);
                  setOneScrollShowing(false);
                }
              }}
            >
              {hoveredColosseum && (
                <div className="DisplayAreaColosseum">
                  <NarrativeScroll
                    narration={`${specificTitle}\n\n${specificNarraration}`}
                    onTextComplete={allowMouseLeave}
                  >
                    <div
                      className="ColosseumImage"
                      style={{ backgroundImage: `url(${specificImage})` }}
                    />
                  </NarrativeScroll>
                </div>
              )}
            </div>
          </>
        )}

        {specificStage === "defeated" && (
          <div className="DefeatedAndForgivenessArea" id="DefeatedAndForgivenessArea">
            <h1 className="DefeatedAndForgivenessTitle">
              The Empire is saddened by your forgetfulness
            </h1>
            <img src="/images/ThoughtBubble.png" className="DefeatedThoughts" alt="" />
            <p className="DefeatedAndForgivenessText">
              I have failed my brethren by forgetting our glory…
            </p>
          </div>
        )}

        {specificStage === "forgiven" && (
          <div className="DefeatedAndForgivenessArea" id="DefeatedAndForgivenessArea">
            <h1 className="DefeatedAndForgivenessTitle">Don’t worry! You are forgiven.</h1>
            <img src="/images/ThoughtBubble.png" className="DefeatedThoughts" alt="" />
            <p className="DefeatedAndForgivenessText">
              Mike and Marcel are glad you came back to their app.
            </p>
          </div>
        )}
      </div>

      <div className="ShowCaseRight">
        <div className="SetReminderShield" onClick={goToSetReminder}></div>
      </div>
    </div>
  );

}

export default FunFactsShowCase;
