import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import {increaseApiLimit, checkApiLimit} from "@/lib/api-limit";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Обработчик HTTP-запроса
 *
 * @param req - объект запроса
 * @returns ответ сервера
 */
export async function POST(
    req: Request
) {
    try {
        const {userId} = auth(); // Извлечение идентификатора пользователя из аутентификации

        const body = await req.json(); // Получение тела запроса в формате JSON
        const {messages} = body; // Извлечение сообщений из тела запроса

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401}); // Возврат ошибки "Unauthorized", если идентификатор пользователя отсутствует
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured.", {status: 500}); // Возврат ошибки "OpenAI API Key not configured.", если ключ API OpenAI не настроен
        }

        if (!messages) {
            return new NextResponse("Messages are required", {status: 400}); // Возврат ошибки "Messages are required", если сообщения отсутствуют
        }

        const freeTrial = await checkApiLimit(); // Проверка бесплатного периода использования API

        if (!freeTrial) {
            return new NextResponse("Free trial limit exceeded", {status: 403}); // Возврат ошибки "Free trial limit exceeded", если превышен лимит бесплатного периода
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        }); // Создание ответа с использованием модели чат-бота GPT-3.5 Turbo

        await increaseApiLimit(); // Увеличение лимита использования API

        return NextResponse.json(response.data.choices[0].message); // Возврат ответа сервера в формате JSON
    } catch (error) {
        console.log('[CONVERSATION_ERROR]', error); // Вывод ошибки в консоль
        return new NextResponse("Internal Error", {status: 500}); // Возврат ошибки "Internal Error", если произошла внутренняя ошибка
    }
};