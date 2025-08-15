import "./RomanQuestionCard.css";

type RomanQuestionCardProps = {
  response: string;
  image: string;
  description: string,
  path: string
};

export default function RomanQuestionCard({ response, image, description, path }: RomanQuestionCardProps) {
  return (
    <div className="CardLayout">
      <div className="BodyArea">{response}</div>
      <img src={image} style={{right: image === "../../../public/images/EmperorCard.png" ? "15%": "18%"}}className="BodyImage"></img>
      <p className="Descriptor" style={{fontSize: image === "../../../public/images/EmperorCard.png" ? "14px" : "16px",
        left: image === "../../../public/images/EmperorCard.png" ? "14%" : "16%"
      }}>{description}</p>
      <p className="Path">{path}</p>
      <p className="Brand">MikeRomanApp</p>
    </div>
  );
}


