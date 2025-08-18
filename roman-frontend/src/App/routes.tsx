import type { RouteObject } from "react-router-dom";

import Login from "../pages/Login/Login";
import SetReminder from "../pages/SetReminder/SetReminder";
import DisplayRomanEmpire from "../pages/DisplayRomanEmpire/DisplayRomanEmpire";
import RomanEmpireSignUp from "../pages/SignUp/RomanEmpireSignUp";
import PersonalityQuiz from "../pages/PersonalityQuiz/PersonalityQuiz";
import RPGWelcome from "../pages/Welcome/RPGWelcome";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <RPGWelcome /> },
  { path: "/signup", element: <RomanEmpireSignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/set-reminder", element: <SetReminder /> },
  { path: "/roman-empire", element: <DisplayRomanEmpire /> },
  { path: "/personality-quiz", element: <PersonalityQuiz /> }
];
