import React, { useEffect, useState } from "react";
import NarrativeScroll from "../../NarrativeScroll/NarrativeScroll";
import "./RPGWelcome.css"
import { useNavigate } from "react-router-dom";

const RPGWelcome: React.FC = () => {
  const sampleText = `Welcome, traveler! Seeking the Glory of Rome? \n \n Look no further - Mike and Marcel have designed an app that will let you experience Rome in all its shining glory. \n \n Simply choose your adventure - are you looking to Enlist? \n \n Or do you have a meeting with our Emperor?`;
  const [closedScroll, showClosedScroll] = useState(true);
  const [showTransitionalButtons, setShowTransitionalButtons] = useState(false);
  const navigate = useNavigate();
  const onFinishedText = () => {
    const timer = setTimeout(() => {
      setShowTransitionalButtons(true);
    }, 4000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showClosedScroll(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="RPGPage">
      <div className="Welcome-LeftSide"></div>
      <div className="Welcome-Center">
        {!showTransitionalButtons && (
          closedScroll ? (
            <div className="UnopenedScroll" />
          ) : (
            <div className="NarrativeScrollWithText">
              <NarrativeScroll
                narration={sampleText}
                onTextComplete={onFinishedText}
              />
            </div>
          )
        )}
        {
          showTransitionalButtons && (
            <div className="TransitionalBannerContainer">
              <div className="JourneyEmbarker" onClick={() => navigate("/signup")} />
              <div className="JourneyContinuer" onClick={() => navigate("/login")} />
            </div>
          )
        }
      </div>
      <div className="Welcome-RightSide"></div>
    </div>
  );
};

export default RPGWelcome;