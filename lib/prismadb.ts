/**
 * Экспортируемый модуль для работы с базой данных Prisma.
 * @module prismadb
 */

import {PrismaClient} from '@prisma/client';

declare global {
    /**
     * Экземпляр PrismaClient для работы с базой данных.
     * @global
     * @name prisma
     * @type {PrismaClient|undefined}
     */
    var prisma: PrismaClient | undefined
}

/**
 * Экземпляр PrismaClient для работы с базой данных.
 * Если экземпляр уже существует, то используется существующий,
 * иначе создается новый экземпляр PrismaClient.
 * @type {PrismaClient}
 */
const prismadb = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb

export default prismadb