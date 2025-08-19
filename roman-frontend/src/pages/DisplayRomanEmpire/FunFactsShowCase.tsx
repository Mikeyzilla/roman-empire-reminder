import { useState } from "react";
import "./FunFactsShowCase.css"
import funfactsJson from "../../funfacts/FunFacts.json";
import type { FunFacts } from "../../funfacts/FunFacts";
import { useNavigate } from "react-router-dom";

function FunFactsShowCase() {
  const [hoveredCalendar, setHoveredCalendar] = useState(false);
  const [hoveredStatue, setHoveredStatue] = useState(false);
  const [hoveredColosseum, setHoveredColosseum] = useState(false);
  const funFactFilter = localStorage.getItem("funFactsFilter");
  const navigate = useNavigate();

  const facts: FunFacts[] = funfactsJson as FunFacts[];

  return (
    <div className="ShowCasePage">
      <div className="ShowCaseLeft"></div>
      <div className="ShowCaseCenter">
        <div
          className="Calendar"
          onMouseEnter={() => setHoveredCalendar(true)}
          onMouseLeave={() => setHoveredCalendar(false)}
        >
          {hoveredCalendar && (
            <div className="DisplayAreaCalendar"></div>
          )}
        </div>

        <div className="Statue"
          onMouseEnter={() => setHoveredStatue(true)}
          onMouseLeave={() => setHoveredStatue(false)}
        >
          {hoveredStatue && (
            <div className="DisplayAreaCalendar"></div>
          )}
        </div>

        <div className="ColosseumFigurine"  onMouseEnter={() => setHoveredColosseum(true)}
          onMouseLeave={() => setHoveredColosseum(false)}
        >
          {hoveredColosseum && (
            <div className="DisplayAreaCalendar"></div>
          )}
        </div>
      </div>
      <div className="ShowCaseRight"></div>
    </div>
  )
}

export default FunFactsShowCase;
