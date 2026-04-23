import { AuthView } from "../_hooks/useAuth";

export interface AuthViewConfig {
  titleKey: string;
  descriptionKey: string;
  buttonTextKey: string;
}

export const authViewConfig: Record<AuthView, AuthViewConfig> = {
  [AuthView.LOGIN]: {
    titleKey: "auth.login.title",
    descriptionKey: "auth.login.description",
    buttonTextKey: "auth.login.buttonText",
  },
  [AuthView.SIGNUP]: {
    titleKey: "auth.signup.title",
    descriptionKey: "auth.signup.description",
    buttonTextKey: "auth.signup.buttonText",
  },
  [AuthView.OTP]: {
    titleKey: "auth.otp.title",
    descriptionKey: "auth.otp.description",
    buttonTextKey: "auth.otp.buttonText",
  },
  [AuthView.EMAIL_LOGIN]: {
    titleKey: "auth.emailLogin.title",
    descriptionKey: "auth.emailLogin.description",
    buttonTextKey: "auth.emailLogin.buttonText",
  },
  [AuthView.EMAIL_OTP]: {
    titleKey: "auth.otp.title",
    descriptionKey: "auth.emailOtp.description",
    buttonTextKey: "auth.otp.buttonText",
  },
};
