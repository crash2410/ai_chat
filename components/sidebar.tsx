"use client";

import Link from "next/link";
import Image from "next/image";
import {Montserrat} from "next/font/google";

import {cn} from "@/lib/utils";
import {Settings, Code, Music, ImageIcon, VideoIcon, LayoutDashboard, MessageSquare} from "lucide-react";
import {usePathname} from "next/navigation";
import FreeCounter from "@/components/free-counter";

const montserrat = Montserrat({subsets: ["latin"], weight: "600"});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    },
    {
        label: "Settings Generation",
        icon: Settings,
        href: "/settings",
    },
]

interface SidebarProps {
    apiLimitCount: number
}


/**
 * Компонент боковой панели
 *
 * @param {number} apiLimitCount - количество лимитов API
 * @returns {JSX.Element} компонент боковой панели
 */

const Sidebar = ({apiLimitCount = 0}: SidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link
                    href="/dashboard"
                    className="flex items-center pl-3 mb-14"
                >
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            src="/logo.png"
                            alt="Logo"
                        />
                    </div>
                    <h1 className={cn(montserrat.className, "text-2xl font-bold")}>
                        Genius
                    </h1>
                </Link>
                <div className="space-y-1">
                    {
                        routes.map(route => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                    pathname === route.href ? "text-white bg-white/10" : "")}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn(route.color, "w-5 h-5 mr-3")}/>
                                    {route.label}
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <FreeCounter
                apiLimitCount={apiLimitCount}
            />
        </div>
    );
};

export default Sidebar;