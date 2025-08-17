import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./NarrativeScroll.css";

type NarrationText = {
  narration: string;
};

const heightToExpandBy = 20;

function NarrativeScroll({ narration }: NarrationText) {
  const [showText, setShowText] = useState(false);
  const [middleHeight, setMiddleHeight] = useState(20);
  const textInsideScrollContainer = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    setMiddleHeight(heightToExpandBy);
    setShowText(false);
    const id = setTimeout(() => setShowText(true), 300);
    return () => clearTimeout(id);
  }, [narration]);

   const updateHeightOnNewLine = useCallback(() => {
    const currentText = textInsideScrollContainer.current;
    if (!currentText) return;
    const needed = currentText.scrollHeight;
    const lines = Math.max(1, Math.ceil(needed / heightToExpandBy));
    const target = lines * heightToExpandBy;
    setMiddleHeight((h) => (h === target ? h : target));
  }, []);

  return (
    <div className="NarrationScroll">
      <div className="TopOfScroll"/>
      <div className="MiddleScroll" style={{height: middleHeight, width: "330px"}}>
        <div className="ScrollContent" ref={textInsideScrollContainer}>
          <RPGTextAnimator text={narration} write={showText} onFrame={updateHeightOnNewLine} />
        </div>
      </div>
      <div className="BottomOfScroll"></div>
    </div>  
  );
} export default NarrativeScroll


function RPGTextAnimator({ text, write, onFrame }: { text: string; write: boolean, onFrame?: () => void; }) {
  const [i, setI] = React.useState(0);

  useEffect(() => {
    setI(0);
  }, [text, write]);

  useEffect(() => {
    if (!write) return;
    const interval = setInterval(() => {
      setI((prev) => (prev < text.length ? prev + 1 : prev));
    }, 50);
    return () => clearInterval(interval);
  }, [write, text]);

  useLayoutEffect(() => {
    onFrame?.();
  }, [i, onFrame]);

  return (
    <div>
      {text.slice(0, i)}
      <span className="NarrativeText" />
    </div>
  );
}



