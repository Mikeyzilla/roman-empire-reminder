import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import introBackground from "../../../public/images/Roman_Empire_Background.png";
import "./Welcome.css";

type Step = 0 | 1 | 2 | 3;

const TEXT = {
  0: { left: "I sure wish I could remember the Roman Empire...", right: "" },
  1: { left: "", right: "Didn't you hear? Mike and Marcel designed an incredible app to help us remember!" },
  2: { left: "Oh yeah? Well what are we waiting for? Let's sign up!", right: "" },
  3: { left: "", right: "" },
} as const;

export default function Welcome() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(0);
  const [showDialogue, setShowDialogue] = useState(true);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(() => {
        setShowDialogue(false);
        setShowLinks(true);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  const onLeftEnter = () => {
    if (step === 0) setStep(1);
    else if (step === 2) setStep(3);
  };

  const onRightEnter = () => {
    if (step === 1) setStep(2);
  };

  const { left, right } = TEXT[step];

  return (
    <div className="container">
    <img className="bg-image" src={introBackground}></img>

      <div
        className="cursormarker1"
        onMouseEnter={onLeftEnter}
      />

      {showDialogue && (
        <div className="textbubblelocation1">
          {left && <div className="bubbletext1">{left}</div>}
        </div>
      )}

      <div
        className="cursormarker2"
        onMouseEnter={onRightEnter}
      />

      {showDialogue && (
        <div className="textbubblelocation2">
          {right && <div className="bubbletext2">{right}</div>}
        </div>
      )}

      {showLinks && (
        <>
          <div
            className="JourneyEmbarker"
            onClick={() => navigate("/signup")}
          />
          <div
            className="JourneyContinuer"
            onClick={() => navigate("/login")}
          />
        </>
      )}
      </div>
  );
}

