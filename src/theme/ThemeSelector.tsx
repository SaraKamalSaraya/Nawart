import React, { useEffect } from 'react';
import "../style.css";
const DarkTheme = React.lazy(() => import('./dark'));
const LightTheme = React.lazy(() => import('./light'));
const Rtl = React.lazy(() => import('./rtl'));

export default function ThemeSelector({ children }: any) {
  const [CHOSEN_THEME, setCHOSEN_THEME] = React.useState(localStorage.getItem('THEME') );
  const [CHOSEN_LANGUAGE, setCHOSEN_LANGUAGE] = React.useState(localStorage.getItem('LANGUAGE'));
  useEffect(() => {
    setCHOSEN_THEME(localStorage.getItem('THEME') || "light");
    setCHOSEN_LANGUAGE(localStorage.getItem('LANGUAGE') || "ar")
  },[])


  return (
    <>
      <React.Suspense fallback={<div style={{ height: "100vh", width: "100vw", background: "white" }}></div>}>
        {(CHOSEN_THEME == "light") && <LightTheme />}
        {(CHOSEN_THEME === "dark") && <DarkTheme />}
        {(CHOSEN_LANGUAGE === "ar") && <Rtl />}
      </React.Suspense>
      {children}
    </>
  )
}
