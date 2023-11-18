import {auth} from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import {MAX_FREE_COUNTS} from "@/constants";

/**
 * Увеличивает лимит API для пользователя
 *
 * @returns {Promise<void>} - Промис без значения
 */
export const increaseApiLimit = async () => {
    // Получаем идентификатор пользователя
    const {userId} = await auth();

    // Если идентификатор пользователя не существует, возвращаемся
    if (!userId) {
        return;
    }

    // Ищем информацию о лимите API для пользователя
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    // Если информация о лимите API существует, обновляем его
    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {
                userId
            },
            data: {
                count: userApiLimit.count + 1
            }
        })
    } else {
        // Если информация о лимите API не существует, создаем ее
        await prismadb.userApiLimit.create({
            data: {
                userId,
                count: 1
            }
        })
    }
}

/**
 * Проверяет лимит API для пользователя.
 * @returns {Promise<boolean>} - Промис, возвращающий булево значение
 */
export const checkApiLimit = async () => {
    // Получаем идентификатор пользователя
    const {userId} = await auth();

    // Если идентификатор пользователя не существует, возвращаем false
    if (!userId) {
        return false;
    }

    // Ищем информацию о лимите API для пользователя
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    // Если информация о лимите API не существует или счетчик меньше максимального значения, возвращаем true
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
}

/**
 * Получает количество доступных API для пользователя
 *
 * @returns {Promise<number>} - Промис с количеством доступных API
 */
export const getApiLimitCount = async (): Promise<number> => {
    // Получаем идентификатор пользователя
    const {userId} = await auth();

    // Если идентификатор пользователя не существует, возвращаем 0
    if (!userId) {
        return 0;
    }

    // Ищем информацию о лимите API для пользователя
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    // Если информация о лимите API не существует, возвращаем 0
    if (!userApiLimit) {
        return 0;
    }

    // Возвращаем количество доступных API
    return userApiLimit.count;
};
