"use client"

import axios from "axios";
import * as z from "zod";
import React, {useState} from 'react';
import Heading from "@/components/heading";
import {Download, ImageIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {amountOptions, resolutionOptions, formSchema} from "@/app/(dashboard)/(routes)/image/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardFooter} from "@/components/ui/card";
import {useProModal} from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

/**
 * Рендерит компонент ImagePage.
 *
 * @returns {JSX.Element} Рендер компонента ImagePage.
 */
const ImagePage = () => {
    const proModal = useProModal();  // Инициализация модального окна
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "256x256"
        }
    });

    const isLoading = form.formState.isSubmitting;

    /**
     * Обработчик события отправки формы.
     *
     * @param {z.infer<typeof formSchema>} values - Значения формы.
     * @returns {Promise<void>} Промис без возвращаемого значения.
     */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]); // Очищаем состояние images перед отправкой формы
            console.log(values);

            const response = await axios.post('/api/image', values); // Отправляем POST-запрос на сервер с значениями формы

            const urls = response.data.map((image: {
                url: string
            }) => image.url); // Извлекаем URL-адреса изображений из ответа сервера

            setImages(urls); // Задаем новые URL-адреса в состоянии images

            form.reset(); // Сбрасываем значения формы
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();  // Открытие модального окна при ошибке доступа
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            router.refresh(); // Обновляем страницу
        }
    };


    return (
        <div>
            <Heading
                title="Image Generation"
                description="Turn your prompt into an image."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField render={
                                ({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl
                                            className="m-0 p-0"
                                        >
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A picture of a horse."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            } name="prompt"/>

                            <FormField
                                name="amount"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="resolution"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
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
                    {isLoading && (
                        <div className="p-20">
                            <Loader/>
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="No image generated."/>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) => (
                            <Card
                                key={src}
                                className="rounded-lg overflow-hidden"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        alt="Image"
                                        fill
                                        src={src}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button
                                        onClick={() => window.open(src)}
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        <Download className="h-4 w-4 mr-2">
                                            Download
                                        </Download>
                                    </Button>
                                </CardFooter>

                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePage;