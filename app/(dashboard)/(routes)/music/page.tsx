"use client"

import axios from "axios";
import * as z from "zod";
import React, {useState} from 'react';
import Heading from "@/components/heading";
import {Music} from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from "@/app/(dashboard)/(routes)/conversation/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";
import {useProModal} from "@/hooks/use-pro-modal";
import {router} from "next/client";
import toast from "react-hot-toast";

/**
 * Компонент страницы музыкальной генерации.
 */
const MusicPage = () => {
    const proModal = useProModal();  // Инициализация модального окна
    const router = useRouter();
    const [music, setMusic] = useState<string>();

    // Инициализация формы с использованием хуков useForm и zodResolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    // Функция-обработчик события отправки формы
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);

            // Отправка запроса на сервер для генерации музыки с использованием axios
            const response = await axios.post('/api/music', values);

            // Установка сгенерированной музыки в состояние
            setMusic(response.data.audio);

            // Сброс значений формы
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();  // Открытие модального окна при ошибке доступа
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            // Обновление страницы с использованием router
            router.refresh(); // Обновляем страницу
        }
    };

    return (
        <div>
            {/* Заголовок страницы */}
            <Heading
                title="Music Generation"
                description="Turn your promt into music"
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    {/* Форма для ввода промпта */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        {/* Поле ввода промпта */}
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Piano solo"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} name="prompt"/>
                            {/* Кнопка для генерации музыки */}
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {/* Отображение состояний загрузки и отсутствия сгенерированной музыки */}
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader/>
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty label="No music generated."/>
                    )}
                    {/* Отображение сгенерированной музыки */}
                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music}/>
                        </audio>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MusicPage;