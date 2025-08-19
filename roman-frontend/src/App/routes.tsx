import type { RouteObject } from "react-router-dom";

import Login from "../pages/Login/Login";
import RomanEmpireSignUp from "../pages/SignUp/RomanEmpireSignUp";
import PersonalityQuiz from "../pages/PersonalityQuiz/PersonalityQuiz";
import RPGWelcome from "../pages/Welcome/RPGWelcome";
import CarveSetReminder from "../pages/SetReminder/CarveSetReminder";
import FunFactsShowCase from "../pages/DisplayRomanEmpire/FunFactsShowCase";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <RPGWelcome /> },
  { path: "/signup", element: <RomanEmpireSignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/set-reminder", element: <CarveSetReminder/> },
  { path: "/funfactshowcase", element: <FunFactsShowCase /> },
  { path: "/personality-quiz", element: <PersonalityQuiz /> }
];
