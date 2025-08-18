import "./RomanQuestionCard.css";

type RomanQuestionCardProps = {
  response: string;
  image: string;
  description: string;
  path: string;
  onClick?: (answer: string) => void;
};

export default function RomanQuestionCard({ response, image, description, path, onClick }: RomanQuestionCardProps) {
  return (
    <div className="CardLayout">
      <div className="BodyArea">{response}</div>
      <div className="HiddenButton" onClick={() => onClick?.(response)}></div>
      <img src={image} style={{right: image === "../../../public/images/EmperorCard.png" ? "20%": "24%"}}className="BodyImage"></img>
      <p className="Descriptor" style={{fontSize: image === "../../../public/images/EmperorCard.png" ? "14px" : "16px",
        left: image === "../../../public/images/EmperorCard.png" ? "17%" : "19%"
      }}>{description}</p>
      <p className="Path" style={{ fontSize: path === "Path of the Competitor" ? "10px" : "12px",  bottom: path === "Path of the Competitor" ? "14px" : "11px"}}
>{path}</p>
      <p className="Brand">MikeRomanApp</p>
    </div>
  );
}


