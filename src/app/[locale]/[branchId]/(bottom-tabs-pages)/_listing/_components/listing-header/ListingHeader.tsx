"use client";

import { Filter, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/button";
import { useFilterStore } from "@/store/filter/filter.store";

const ListingHeader = () => {
    const t = useTranslations("common");
    const router = useRouter();
    const params = useParams<{ locale: string; branchId: string }>();
    const setFilterModalOpen = useFilterStore((s) => s.setFilterModalOpen);

    const goToSearch = () =>
        router.push(`/${params.locale}/${params.branchId}/search`);

    return (
        <div className="grid grid-cols-[1fr_52px] items-stretch justify-between gap-4">
            <button
                type="button"
                onClick={goToSearch}
                aria-label={t("search")}
                className="w-full relative bg-white rounded-2xl border border-gray-300 px-4 py-3 text-left"
            >
                <span className="text-lg text-[#5a5a5a]">{t("search")}</span>
                <span className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2">
                    <Search className="text-gray-500" />
                </span>
            </button>
            <Button
                variant="outline"
                iconOnly
                size="base"
                rounded="lg"
                className="h-full w-[52px] shrink-0"
                onClick={() => setFilterModalOpen(true)}
            >
                <Filter size={20} className="text-gray-700" />
            </Button>
        </div>
    );
};

export default ListingHeader;

