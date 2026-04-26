"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/app/[locale]/[branchId]/login/_components/input/Input";
import { Button } from "@/components/atoms/button";
import type { AddressInput, CustomerAddress } from "@/lib/api/addresses";

interface AddressFormProps {
    initial?: CustomerAddress | null;
    isSaving: boolean;
    error?: string | null;
    onCancel: () => void;
    onSubmit: (values: AddressInput) => Promise<void> | void;
}

const emptyValues: AddressInput = {
    label: "",
    line1: "",
    line2: "",
    area: "",
    city: "",
    country: "",
    postal_code: "",
    contact_phone: "",
    notes: "",
    is_default: false,
};

const toFormValues = (a?: CustomerAddress | null): AddressInput =>
    a
        ? {
              label: a.label ?? "",
              line1: a.line1,
              line2: a.line2 ?? "",
              area: a.area ?? "",
              city: a.city,
              country: a.country,
              postal_code: a.postal_code ?? "",
              contact_phone: a.contact_phone ?? "",
              notes: a.notes ?? "",
              is_default: a.is_default,
          }
        : emptyValues;

const AddressForm = ({ initial, isSaving, error, onCancel, onSubmit }: AddressFormProps) => {
    const t = useTranslations("addresses");
    const [values, setValues] = useState<AddressInput>(() => toFormValues(initial));

    useEffect(() => {
        setValues(toFormValues(initial));
    }, [initial]);

    const update = <K extends keyof AddressInput>(key: K, value: AddressInput[K]) =>
        setValues((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cleaned: AddressInput = {
            ...values,
            label: values.label?.trim() || undefined,
            line2: values.line2?.trim() || undefined,
            area: values.area?.trim() || undefined,
            postal_code: values.postal_code?.trim() || undefined,
            contact_phone: values.contact_phone?.trim() || undefined,
            notes: values.notes?.trim() || undefined,
            line1: values.line1.trim(),
            city: values.city.trim(),
            country: values.country.trim(),
        };
        onSubmit(cleaned);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
                label={t("form.label")}
                placeholder={t("form.labelPlaceholder")}
                value={values.label}
                onChange={(e) => update("label", e.target.value)}
            />
            <Input
                label={t("form.line1")}
                placeholder={t("form.line1Placeholder")}
                required
                value={values.line1}
                onChange={(e) => update("line1", e.target.value)}
            />
            <Input
                label={t("form.line2")}
                placeholder={t("form.line2Placeholder")}
                value={values.line2}
                onChange={(e) => update("line2", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
                <Input
                    label={t("form.area")}
                    placeholder={t("form.areaPlaceholder")}
                    value={values.area}
                    onChange={(e) => update("area", e.target.value)}
                />
                <Input
                    label={t("form.city")}
                    placeholder={t("form.cityPlaceholder")}
                    required
                    value={values.city}
                    onChange={(e) => update("city", e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <Input
                    label={t("form.postalCode")}
                    placeholder="00000"
                    value={values.postal_code}
                    onChange={(e) => update("postal_code", e.target.value)}
                />
                <Input
                    label={t("form.country")}
                    placeholder={t("form.countryPlaceholder")}
                    required
                    value={values.country}
                    onChange={(e) => update("country", e.target.value)}
                />
            </div>
            <Input
                label={t("form.contactPhone")}
                placeholder="+971501234567"
                inputMode="tel"
                value={values.contact_phone}
                onChange={(e) => update("contact_phone", e.target.value)}
            />
            <Input
                label={t("form.notes")}
                placeholder={t("form.notesPlaceholder")}
                value={values.notes}
                onChange={(e) => update("notes", e.target.value)}
            />

            <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={values.is_default ?? false}
                    onChange={(e) => update("is_default", e.target.checked)}
                />
                {t("form.setAsDefault")}
            </label>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    size="lg"
                    rounded="lg"
                    onClick={onCancel}
                    disabled={isSaving}
                >
                    {t("form.cancel")}
                </Button>
                <Button
                    type="submit"
                    variant="secondary"
                    fullWidth
                    size="lg"
                    rounded="lg"
                    disabled={isSaving}
                >
                    {isSaving ? t("form.saving") : t("form.save")}
                </Button>
            </div>
        </form>
    );
};

export default AddressForm;
