"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Plus, Pencil, Trash2, Star, MapPin } from "lucide-react";
import BackButton from "@/components/atoms/back-button/BackButton";
import { Button } from "@/components/atoms/button";
import BottomSheetWrapper from "@/components/molecules/bottom-sheet-wrapper/BottomSheetWrapper";
import { useAddressesStore } from "@/store/addresses/addresses.store";
import type { AddressInput, CustomerAddress } from "@/lib/api/addresses";
import AddressForm from "./AddressForm";

const AddressesTemplate = () => {
    const t = useTranslations("addresses");
    const params: { branchId: string } = useParams();
    const {
        addresses,
        isLoading,
        isMutating,
        error,
        loaded,
        fetch,
        add,
        update,
        remove,
        makeDefault,
    } = useAddressesStore();

    const [editing, setEditing] = useState<CustomerAddress | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        if (!loaded) fetch();
    }, [loaded, fetch]);

    const openCreate = () => {
        setEditing(null);
        setFormError(null);
        setIsFormOpen(true);
    };

    const openEdit = (address: CustomerAddress) => {
        setEditing(address);
        setFormError(null);
        setIsFormOpen(true);
    };

    const handleSubmit = async (values: AddressInput) => {
        setFormError(null);
        const result = editing
            ? await update(editing._id, values)
            : await add(values);
        if (result) {
            setIsFormOpen(false);
            setEditing(null);
        } else {
            setFormError(useAddressesStore.getState().error);
        }
    };

    return (
        <div className="min-h-dvh bg-gray-50 pb-10">
            <div className="bg-white px-5 pt-12 pb-5 rounded-b-3xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <BackButton fallbackUrl={`/${params.branchId}/account`} />
                    <h1 className="text-xl font-bold text-gray-900">{t("title")}</h1>
                </div>
                <p className="text-sm text-gray-500">{t("description")}</p>
            </div>

            <div className="px-5 mt-4">
                {error && !isFormOpen && (
                    <div className="mb-3 p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>
                )}

                {isLoading && addresses.length === 0 && (
                    <div className="py-10 text-center text-gray-500 text-sm">{t("loading")}</div>
                )}

                {!isLoading && addresses.length === 0 && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-3">
                            <MapPin size={22} />
                        </div>
                        <p className="text-sm text-gray-700 font-semibold mb-1">{t("emptyTitle")}</p>
                        <p className="text-xs text-gray-500 mb-4">{t("emptyDescription")}</p>
                        <Button
                            variant="secondary"
                            size="base"
                            rounded="lg"
                            leftIcon={<Plus size={16} />}
                            onClick={openCreate}
                        >
                            {t("addNew")}
                        </Button>
                    </div>
                )}

                <div className="space-y-3">
                    {addresses.map((address) => (
                        <div
                            key={address._id}
                            className="bg-white border border-gray-100 rounded-2xl p-4"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                                            {address.label || address.line1}
                                        </h3>
                                        {address.is_default && (
                                            <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                <Star size={10} fill="currentColor" />
                                                {t("default")}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {[
                                            address.line1,
                                            address.line2,
                                            address.area,
                                            address.city,
                                            address.postal_code,
                                            address.country,
                                        ]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </p>
                                    {address.contact_phone && (
                                        <p className="text-xs text-gray-400 mt-1">{address.contact_phone}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                                {!address.is_default && (
                                    <Button
                                        variant="text-primary"
                                        size="xs"
                                        onClick={() => makeDefault(address._id)}
                                        disabled={isMutating}
                                    >
                                        {t("makeDefault")}
                                    </Button>
                                )}
                                <Button
                                    variant="text-primary"
                                    size="xs"
                                    leftIcon={<Pencil size={12} />}
                                    onClick={() => openEdit(address)}
                                    disabled={isMutating}
                                >
                                    {t("edit")}
                                </Button>
                                <Button
                                    variant="text-destructive"
                                    size="xs"
                                    leftIcon={<Trash2 size={12} />}
                                    onClick={() => remove(address._id)}
                                    disabled={isMutating}
                                >
                                    {t("delete")}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {addresses.length > 0 && (
                    <Button
                        variant="outline"
                        fullWidth
                        size="lg"
                        rounded="lg"
                        leftIcon={<Plus size={18} />}
                        className="mt-4"
                        onClick={openCreate}
                    >
                        {t("addNew")}
                    </Button>
                )}
            </div>

            <BottomSheetWrapper
                show={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditing(null);
                }}
                className="p-6 max-h-[90vh] overflow-y-auto"
            >
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {editing ? t("editTitle") : t("addTitle")}
                </h2>
                <AddressForm
                    initial={editing}
                    isSaving={isMutating}
                    error={formError}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setEditing(null);
                    }}
                    onSubmit={handleSubmit}
                />
            </BottomSheetWrapper>
        </div>
    );
};

export default AddressesTemplate;
