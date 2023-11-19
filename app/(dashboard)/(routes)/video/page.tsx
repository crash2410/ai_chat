"use client"

import axios from "axios";
import * as z from "zod";
import React, {useState} from 'react';
import Heading from "@/components/heading";
import {Music, VideoIcon} from "lucide-react";
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
import toast from "react-hot-toast";

/**
 * Компонент страницы видео генерации.
 */
const VideoPage = () => {
    const proModal = useProModal();  // Инициализация модального окна
    const router = useRouter();
    const [video, setVideo] = useState<string>();

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
            setVideo(undefined);

            // Отправка запроса на сервер для генерации видео с использованием axios
            const response = await axios.post('/api/video', values);

            // Установка сгенерированной видео в состояние
            setVideo(response.data[0]);

            // Сброс значений формы
            form.reset();
        } catch (error:any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();  // Открытие модального окна при ошибке доступа
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            // Обновление страницы с использованием router
            router.refresh();
        }
    };

    return (
        <div>
            {/* Заголовок страницы */}
            <Heading
                title="Video Generation"
                description="Turn your promt into video"
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
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
                                            placeholder="Clown fish swimming around a coral reef"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} name="prompt"/>
                            {/* Кнопка для генерации видео */}
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
                    {/* Отображение состояний загрузки и отсутствия сгенерированной видео */}
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader/>
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty label="No music generated."/>
                    )}
                    {/* Отображение сгенерированной видео */}
                    {video && (
                        <video
                            className="w-full aspect-video mt-8 rounded-lg border bg-black"
                            controls
                        >
                            <source
                                src={video}
                            />

                        </video>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPage;