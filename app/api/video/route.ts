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
        console.log(body)

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
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt: prompt
                }
            }
        );

        await increaseApiLimit();


        return NextResponse.json(response);
    } catch (error) {
        console.log('[VIDEO_ERROR]', error);
        return new NextResponse("Internal Error", {status: 500});
    }
};