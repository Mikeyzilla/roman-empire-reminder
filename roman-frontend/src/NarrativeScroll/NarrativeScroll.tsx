import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import "./NarrativeScroll.css";

type NarrationText = {
  narration: string;
  onTextComplete: () => void;
  children?: ReactNode;
};

const heightToExpandBy = 20;

function NarrativeScroll({ narration, onTextComplete, children }: NarrationText) {
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
    const element = textInsideScrollContainer.current;
    if (!element) return;
    const needed = element.scrollHeight;
    const lines = Math.max(1, Math.ceil(needed / heightToExpandBy));
    const target = lines * heightToExpandBy;
    setMiddleHeight((h) => (h === target ? h : target));
  }, []);

  useEffect(() => {
    updateHeightOnNewLine();
  }, [children, updateHeightOnNewLine]);

  return (
    <div className="NarrationScroll">
      <div className="TopOfScroll" />
      <div className="MiddleScroll" style={{ height: middleHeight, width: "330px" }}>
        <div className="ScrollContent" ref={textInsideScrollContainer}>
          <RPGTextAnimator text={narration} write={showText} onFrame={updateHeightOnNewLine} onComplete={onTextComplete} />
          {children}
        </div>
      </div>
      <div className="BottomOfScroll"></div>
    </div>
  );
} export default NarrativeScroll


function RPGTextAnimator({
  text,
  write,
  onFrame,
  onComplete,
}: {
  text: string;
  write: boolean;
  onFrame?: () => void;
  onComplete?: () => void;
}) {
  const [i, setI] = React.useState(0);
  const firedRef = React.useRef(false);

  useEffect(() => {
    setI(0);
    firedRef.current = false;
  }, [text, write]);

  useEffect(() => {
    if (!write) return;
    const interval = setInterval(() => {
      setI(prev => (prev < text.length ? prev + 1 : prev));
    }, 50);
    return () => clearInterval(interval);
  }, [write, text]);

  useEffect(() => {
    if (!write) return;
    if (i >= text.length && !firedRef.current) {
      firedRef.current = true;
      onComplete?.();
    }
  }, [i, write, text.length, onComplete]);

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
