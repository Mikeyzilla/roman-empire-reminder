import type { RouteObject } from "react-router-dom";

import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/Login/Login";
import SetReminder from "../pages/SetReminder/SetReminder";
import DisplayRomanEmpire from "../pages/DisplayRomanEmpire/DisplayRomanEmpire";
import RomanEmpireSignUp from "../pages/SignUp/RomanEmpireSignUp";
import PersonalityQuiz from "../pages/PersonalityQuiz/PersonalityQuiz";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <Welcome /> },
  { path: "/signup", element: <RomanEmpireSignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/set-reminder", element: <SetReminder /> },
  { path: "/roman-empire", element: <DisplayRomanEmpire /> },
  { path: "/personality-quiz", element: <PersonalityQuiz /> }
];
