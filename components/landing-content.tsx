"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const testimonials = [
    {
        name: "Carter",
        avatar: "C",
        title: "Software Engineer",
        description: "I love the way it works. I can't believe it. I'm so happy I can now use it for my own projects.",
    },
    {
        name: "Antonio",
        avatar: "A",
        title: "Manager",
        description: "I love the way it works. I can't believe it. I'm so happy I can now use it for my own projects.",
    },
    {
        name: "John",
        avatar: "J",
        title: "Developer",
        description: "I love the way it works. I can't believe it. I'm so happy I can now use it for my own projects.",
    },
    {
        name: "Steve",
        avatar: "S",
        title: "Front-End Developer",
        description: "I love the way it works. I can't believe it. I'm so happy I can now use it for my own projects.",
    },
]

/**
 * Компонент LandingContent отображает блок с отзывами (Testimonials).
 */
export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            {/* Заголовок */}
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            {/* Сетка с карточками */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Маппинг массива отзывов на карточки */}
                {testimonials.map((item) => (
                    <Card
                        key={item.description}
                        className="bg-[#192339] border-none text-white"
                    >
                        {/* Заголовок карточки */}
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    {/* Имя автора */}
                                    <p className="text-lg">{item.name}</p>
                                    {/* Должность автора */}
                                    <p className="text-zcinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            {/* Описание отзыва */}
                            <CardContent className="pt-4 px-0">{item.description}</CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
};