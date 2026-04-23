import { apiFetch } from "./client";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  organizationId: string;
  branchId: string;
}

export interface VerifyEmailOtpResult {
  message: string;
  is_new_user: boolean;
  user: AuthUser;
}

export async function requestEmailOtp(email: string, branchId: string): Promise<void> {
  await apiFetch<{ message: string }>("/auth/customer/email/request-otp", {
    method: "POST",
    body: { email, branch_id: branchId },
    credentials: "include",
  });
}

export async function verifyEmailOtp(params: {
  email: string;
  code: string;
  branchId: string;
  fullName?: string;
}): Promise<VerifyEmailOtpResult> {
  return apiFetch<VerifyEmailOtpResult>("/auth/customer/email/verify-otp", {
    method: "POST",
    body: {
      email: params.email,
      code: params.code,
      branch_id: params.branchId,
      full_name: params.fullName,
    },
    credentials: "include",
  });
}

export async function logout(): Promise<void> {
  await apiFetch<{ message: string }>("/auth/customer/logout", {
    method: "POST",
    credentials: "include",
  });
}
