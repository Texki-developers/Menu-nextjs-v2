"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
    Bell,
    User,
    Star,
    RotateCcw,
    HelpCircle,
    LogOut,
    ChevronRight,
    Heart,
} from "lucide-react";
import { Button } from "@/components/atoms/button";

// Mock data for past orders
const PAST_ORDERS_MOCK = [
    {
        id: 1,
        items: "Premium Pasta Combo",
        date: "2 days ago",
        total: 45.50,
        status: "Delivered",
        image: "https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        items: "Breakfast Special",
        date: "5 days ago",
        total: 32.00,
        status: "Delivered",
        image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        items: "Fast Food Feast",
        date: "1 week ago",
        total: 58.75,
        status: "Delivered",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const AccountScreen = () => {
    const t = useTranslations("account");

    return (
        <div className="pb-6 animate-in fade-in slide-in-from-right-8 duration-300 bg-gray-50 min-h-screen">
            {/* Profile Header */}
            <div className="bg-white pb-6 pt-12 px-6 rounded-b-3xl shadow-sm mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{t("myProfile")}</h2>
                    <Button variant="ghost" iconOnly size="base" rounded="full" className="bg-gray-50">
                        <Bell size={20} />
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 border-2 border-white shadow-md">
                        <User size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Alex Johnson</h3>
                        <p className="text-sm text-gray-500">alex.johnson@example.com</p>
                    </div>
                </div>

                {/* Loyalty Card (Gamification) */}
                <div className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 text-white shadow-xl shadow-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1 block">{t("goldMember")}</span>
                            <h4 className="text-2xl font-bold">1,240 {t("points")}</h4>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                            <Star size={20} fill="currentColor" className="text-yellow-400" />
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-white/20 h-1.5 rounded-full mb-2">
                        <div className="bg-yellow-400 h-1.5 rounded-full w-[70%] shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                    </div>
                    <p className="text-[10px] text-gray-400">760 {t("ptsToPlatinum")}</p>
                </div>
            </div>

            {/* Recent Orders Section */}
            <div className="px-5 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">{t("recentOrders")}</h3>
                    <Button variant="text-primary" size="xs">
                        {t("viewAll")}
                    </Button>
                </div>

                <div className="space-y-4">
                    {PAST_ORDERS_MOCK.map((order) => (
                        <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-xl shrink-0 overflow-hidden relative">
                                <Image src={order.image} alt={order.items} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{order.items}</h4>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">{t("delivered")}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">{order.date} • AED {order.total}</p>

                                <Button
                                    variant="orange-ghost"
                                    size="sm"
                                    fullWidth
                                    leftIcon={<RotateCcw size={12} />}
                                >
                                    {t("reorder")}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menu List */}
            <div className="px-5 space-y-2">
                {[
                    { icon: Heart, label: t("savedItems") },
                    { icon: HelpCircle, label: t("helpSupport") },
                    { icon: LogOut, label: t("logOut"), variant: "text-destructive" as const },
                ].map((item, idx) => (
                    <Button
                        key={idx}
                        variant="outline"
                        fullWidth
                        size="base"
                        rounded="lg"
                        rightIcon={<ChevronRight size={18} className="text-gray-300" />}
                        className="justify-between p-4"
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={20} className={item.variant === "text-destructive" ? "text-red-500" : "text-gray-500"} />
                            <span className={item.variant === "text-destructive" ? "text-red-500" : "text-gray-700"}>
                                {item.label}
                            </span>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default AccountScreen;
