import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
}

/**
 * Отправляет POST запрос с сообщениями к OpenAI модели для получения ответа.
 * @param req - Запрос от клиента.
 * @returns Ответ сервера.
 */
export async function POST(
    req: Request
) {
    try {
        // Авторизация пользователя
        const {userId} = auth();

        // Получение тела запроса
        const body = await req.json();
        const {messages} = body;

        // Проверка авторизации пользователя
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        // Проверка наличия API ключа
        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured.", {status: 500});
        }

        // Проверка наличия сообщений в теле запроса
        if (!messages) {
            return new NextResponse("Messages are required", {status: 400});
        }

        // Запрос к OpenAI модели для создания ответа
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        });

        // Возвращение ответа сервера
        return NextResponse.json(response.data.choices[0].message);
    } catch (error) {
        console.log('[CODE_ERROR]', error);
        return new NextResponse("Internal Error", {status: 500});
    }
};