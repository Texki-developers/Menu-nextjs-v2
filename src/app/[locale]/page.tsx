import { useTranslations } from "next-intl";

const HomePage = () => {
    const t = useTranslations("Home");
    return (
        <div>
            <h1>{t("title")}</h1>
        </div>
    );
};

export default HomePage;
