import React, { useEffect, useState } from "react";
import NarrativeScroll from "../../NarrativeScroll/NarrativeScroll";
import "./RPGWelcome.css"

const RPGWelcome: React.FC = () => {
  const sampleText = `Welcome, traveler! Seeking the Glory of Rome? Look no further - Mike and Marcel have designed an app that will let you experience Rome in all its shining glory. Simply choose your adventure - are you looking to Enlist? Or do you have a meeting with our Emperor?`;
  const [closedScroll, showClosedScroll] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      showClosedScroll(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="RPGPage">
     {closedScroll ? (
        <div className="UnopenedScroll"></div>
      ) : (
        <div className="NarrativeScrollWithText">
          <NarrativeScroll narration={sampleText} />
        </div>
      )}
    </div>
  );
};

export default RPGWelcome;