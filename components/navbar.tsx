
import {UserButton} from "@clerk/nextjs";
import React from "react";
import MobileSidebar from "@/components/mobile-sidebar";
import {getApiLimitCount} from "@/lib/api-limit";

/**
 * Компонент Navbar.
 *
 * Этот компонент отображает верхнюю панель навигации.
 * Внутри компонента используются следующие компоненты:
 * - MobileSidebar: боковая панель для мобильных устройств.
 * - UserButton: кнопка для пользователя.
 * - getApiLimitCount: функция для получения лимита API.
 */
const Navbar = async () => {
    // Получаем значение apiLimitCount с помощью функции getApiLimitCount
    const apiLimitCount = await getApiLimitCount()

    return (
        <div className="flex items-center p-4 ">
            {/* Отображаем боковую панель для мобильных устройств */}
            <MobileSidebar apiLimitCount={apiLimitCount}/>
            <div className="flex w-full justify-end">
                {/* Отображаем кнопку для пользователя */}
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
};

export default Navbar;