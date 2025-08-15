import { useState } from "react";
import "./PersonalityQuiz.css";
import RomanQuestionCard from "../../RomanQuestionCard/RomanQuestionCard";
import questionsJson from "../../Questions/Questions.json";
import type { Questions } from "../../Questions/Questions";

type Visibility = 'visible' | 'hidden';

export default function PersonalityQuiz() {
  const [index, setIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [overlayVisibility, setOverlayVisibility] = useState<Visibility>("hidden");
  const questions: Questions[] = questionsJson as Questions[];
  const q = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  return (
    <div className="QuestionLayout">
      <div className="BgCol left" />
      <div className="BgCol center" />
      <div className="BgCol right" />

      <div className="ContentOverlay">
        <div className="ThoughtBubbleConversation">
          <div className="Conversation">Mighty warrior! Your trial before you shall not be a test of might, but one of wits. Answer true to yourself, and the knowledge of Rome shall be fit to your liking. Now then, let us commence shortly!</div>
        </div>
        {showQuiz && (
          <div className="ContentInner">
            <div className="ProgressBar">
              <div
                className="ProgressMeasurement"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div
              id="overlay"
              className="overlay"
              style={{ visibility: overlayVisibility }}
            ></div>

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
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

