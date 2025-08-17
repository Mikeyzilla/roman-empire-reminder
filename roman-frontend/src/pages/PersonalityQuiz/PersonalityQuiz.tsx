import { useEffect, useState } from "react";
import "./PersonalityQuiz.css";
import RomanQuestionCard from "../../RomanQuestionCard/RomanQuestionCard";
import questionsJson from "../../Questions/Questions.json";
import type { Questions } from "../../Questions/Questions";
import { useNavigate } from "react-router-dom";

type Visibility = 'visible' | 'hidden';

export default function PersonalityQuiz() {
  const [index, setIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [overlayVisibility, setOverlayVisibility] = useState<Visibility>("hidden");
  const [hideBubble, setHideBubble] = useState(false);
  const [conversation, setConversation] = useState(" Mighty warrior! Your trial before you shall not be a test of might, but one of wits. Answer true to yourself, and the knowledge of Rome shall be fit to your liking. Now then, let us commence shortly!")
  const questions: Questions[] = questionsJson as Questions[];
  const q = questions[index];
  const progress = ((index + 1) / questions.length) * 100;
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setHideBubble(true);
      setShowQuiz(true);
      setOverlayVisibility("visible");
    }, 6000);
    return () => clearTimeout(timerId);
  }, []);

  const retrieveUserAnswer = (answer: string) => {
    localStorage.setItem("funFactsFilter", answer);
    setIndex(prev => {
      const next = prev + 1;
      if (next >= questions.length) {
        setShowQuiz(false);
        setConversation("Well done. You have succeeded mighty warrior! Your reward will be newfound knowledge in the hall of fun facts.");
        setTimeout(() => {
           navigate("/roman-empire");
        }, 4000)      
      }
      return next;
    });
  };


  return (
    <div className="QuestionLayout">
      <div className="BgCol left" />
      <div className="BgCol center" />
      <div className="BgCol right" />

      <div className="ContentOverlay">
        {!hideBubble && (
          <div className="ThoughtBubbleConversation">
            <div className="Conversation">
              {conversation}
            </div>
          </div>
        )}
        {showQuiz && (
          <div className="ContentInner">
            <div className="ProgressBar">
              <div
                className="ProgressMeasurement"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="TitleArea">
              <h1 className="Title">{q.questionName}</h1>
            </div>

            <div className="ResponsesGrid">
              {q.possibleResponses.map((resp, i) => (
                <RomanQuestionCard
                  key={`${q.questionName}-${i}-${resp}`}
                  response={resp}
                  image={q.associatedImage[i]}
                  description={q.associatedDescription[i]}
                  path={q.associatedPath[i]}
                  onClick={retrieveUserAnswer}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

