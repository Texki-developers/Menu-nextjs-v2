"use client";

import { useState } from "react";
import Login from "./login/Login";
import OtpEnter from "./otp-enter/OtpEnter";
import Signup from "./signup/Signup";

type AuthView = "login" | "signup" | "otp";

const LoginTemplate = () => {
    const [currentView, setCurrentView] = useState<AuthView>("login");

    return (
        <div className="w-full min-h-dvh flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {currentView === "login" && <Login />}

                {currentView === "signup" && <Signup />}

                {currentView === "otp" && <OtpEnter />}
            </div>
        </div>
    );
};

export default LoginTemplate;
