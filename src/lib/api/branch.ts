import { apiFetch, API_BASE_URL } from "./client";
import type { BranchInfo } from "./menu";

interface BranchDetailsResponse {
  branch: BranchInfo;
}

export async function getBranchDetails(branchId: string): Promise<BranchInfo | null> {
  if (!API_BASE_URL) return null;
  try {
    const res = await apiFetch<BranchDetailsResponse>(`/public/branches/${branchId}`, {
      revalidate: 60,
    });
    return res?.branch ?? null;
  } catch (err) {
    console.error("[getBranchDetails] failed:", err);
    return null;
  }
}
