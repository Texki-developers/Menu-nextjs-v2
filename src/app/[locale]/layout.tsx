import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import BottomTabs from "@/components/organisms/bottom-tabs/BottomTabs";
import LanguagePopup from "@/components/organisms/language-popup/LanguagePopup";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} className="bg-black">
            <body className="w-full min-h-dvh max-w-container mx-auto h-full relative">
                <div className="container">
                    <NextIntlClientProvider>
                        <LanguagePopup />
                        {children}
                        <BottomTabs />
                    </NextIntlClientProvider>
                </div>
            </body>
        </html>
    );
}
