import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { ToastHost } from "@/components/molecules/toast/ToastHost";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            <body className="w-full min-h-dvh max-h-dvh overflow-hidden! bg-body">
                <div className="container relative min-h-dvh max-h-dvh overflow-hidden bg-surface text-ink">
                    <NextIntlClientProvider>
                        <QueryProvider>
                            {children}
                            <ToastHost />
                        </QueryProvider>
                    </NextIntlClientProvider>
                </div>
            </body>
        </html>
    );
}
