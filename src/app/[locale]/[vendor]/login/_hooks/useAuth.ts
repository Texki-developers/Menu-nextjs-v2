"use client";

import { useState } from "react";

export enum AuthView {
  LOGIN = "login",
  SIGNUP = "signup",
  OTP = "otp",
}

export const useAuth = () => {
  const [currentView, setCurrentView] = useState<AuthView>(AuthView.LOGIN);

  const setLoginView = () => setCurrentView(AuthView.LOGIN);
  const setSignupView = () => setCurrentView(AuthView.SIGNUP);
  const setOTPView = () => setCurrentView(AuthView.OTP);

  return {
    currentView,
    setCurrentView,
    setLoginView,
    setSignupView,
    setOTPView,
  };
};
