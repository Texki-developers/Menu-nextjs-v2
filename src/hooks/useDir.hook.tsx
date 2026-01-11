import { useLocale } from "next-intl";

const useDir = () => {
    const locale = useLocale();
    return locale === "ar";

};

export default useDir;
