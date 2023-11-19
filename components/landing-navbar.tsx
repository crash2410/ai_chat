"use client"

import {Montserrat} from "next/font/google"
import Link from "next/link"
import {useAuth} from "@clerk/nextjs";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";


const font = Montserrat({
    subsets: ["latin"],
    weight: "600",
});


/**
 * Компонент LandingNavbar отображает навигационную панель в верхней части страницы.
 * @returns JSX-элемент навигационной панели.
 */
export const LandingNavbar = () => {
    const {isSignedIn} = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            {/* Логотип */}
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image
                        fill
                        alt="logo"
                        src="/logo.png"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Genius
                </h1>
            </Link>
            {/* Кнопка "Get Started" */}
            <div className="flex items-center gap-x-2">
                <Link
                    href={isSignedIn ? "/dashboard" : "/sign-in"}
                >
                    <Button variant="outline" className="rounded-full">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}