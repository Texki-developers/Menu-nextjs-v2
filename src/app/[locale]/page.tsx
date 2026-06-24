import { redirect } from "@/i18n/navigation";
import { DEFAULT_BRANCH } from "@/constants/routes";

export default async function LocaleRoot({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect({ href: `/${DEFAULT_BRANCH}/welcome`, locale });
}
