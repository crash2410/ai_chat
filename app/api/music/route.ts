import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import Replicate from "replicate";
import {checkApiLimit, increaseApiLimit} from "@/lib/api-limit";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || '',
});

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
        const {prompt} = body

        // Проверяем наличие идентификатора пользователя
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        // Проверяем наличие текстового промпт-а
        if (!prompt) {
            return new NextResponse("Promt are required", {status: 400});
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial limit exceeded", {status: 403});
        }


        // Выполняем запрос к стороннему сервису
        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    prompt_a: prompt
                }
            }
        );

        await increaseApiLimit();

        return NextResponse.json(response);
    } catch (error) {
        console.log('[MUSIC_ERROR]', error);
        return new NextResponse("Internal Error", {status: 500});
    }
};