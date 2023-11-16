import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {Configuration, OpenAIApi} from "openai";
import {checkApiLimit, increaseApiLimit} from "@/lib/api-limit";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Обрабатывает POST-запрос.
 *
 * @param req - Запрос от клиента.
 * @returns - Ответ сервера.
 */
export async function POST(
    req: Request
) {
    try {
        // Получаем идентификатор пользователя
        const {userId} = auth();

        // Получаем тело запроса
        const body = await req.json();

        // Извлекаем необходимые данные из тела запроса
        const {prompt, amount = 1, resolution = "512x512"} = body;

        // Проверяем наличие идентификатора пользователя
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        // Проверяем наличие настроенного API-ключа OpenAI
        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured.", {status: 500});
        }

        // Проверяем наличие текстового промпт-а
        if (!prompt) {
            return new NextResponse("Prompt is required", {status: 400});
        }

        // Проверяем наличие значения amount
        if (!amount) {
            return new NextResponse("Amount is required", {status: 400});
        }

        // Проверяем наличие значения resolution
        if (!resolution) {
            return new NextResponse("Resolution is required", {status: 400});
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial limit exceeded", {status: 403});
        }


        // Создаем изображение с помощью OpenAI API
        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        await increaseApiLimit();

        // Возвращаем ответ в формате JSON
        return NextResponse.json(response.data.data);
    } catch (error) {
        // Обрабатываем ошибку
        console.log('[IMAGE_ERROR]', error);
        return new NextResponse("Internal Error", {status: 500});
    }
};