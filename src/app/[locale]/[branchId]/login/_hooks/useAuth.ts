"use client";

import { useState } from "react";

export enum AuthView {
  LOGIN = "login",
  SIGNUP = "signup",
  OTP = "otp",
  EMAIL_LOGIN = "email_login",
  EMAIL_OTP = "email_otp",
}

export const useAuth = (initial: AuthView = AuthView.LOGIN) => {
  const [currentView, setCurrentView] = useState<AuthView>(initial);

  return {
    currentView,
    setCurrentView,
    setLoginView: () => setCurrentView(AuthView.LOGIN),
    setSignupView: () => setCurrentView(AuthView.SIGNUP),
    setOTPView: () => setCurrentView(AuthView.OTP),
    setEmailLoginView: () => setCurrentView(AuthView.EMAIL_LOGIN),
    setEmailOTPView: () => setCurrentView(AuthView.EMAIL_OTP),
  };
};
