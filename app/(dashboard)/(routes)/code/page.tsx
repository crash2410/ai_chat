"use client"

import axios from "axios";
import OpenAI from 'openai';
import * as z from "zod";
import React, {useState} from 'react';
import Heading from "@/components/heading";
import {Code} from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from "@/app/(dashboard)/(routes)/conversation/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ChatCompletionRequestMessage} from "openai";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";
import {cn} from "@/lib/utils";
import {UserAvatar} from "@/components/user-avatar";
import {BotAvatar} from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";
import {useProModal} from "@/hooks/use-pro-modal";

/**
 * Компонент CodePage.
 * Отвечает за генерацию кода на основе описания.
 */
const CodePage = () => {
    const proModal = useProModal();  // Инициализация модального окна
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    /**
     * Обработчик события отправки формы.
     * @param values - значения формы
     */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Создаем сообщение от пользователя
            const userMessage: ChatCompletionRequestMessage = {role: "user", content: values.prompt};

            // Добавляем сообщение от пользователя в массив
            const newMessages = [...messages, userMessage];

            // Отправляем запрос на сервер с массивом сообщений
            const response = await axios.post('/api/code', {messages: newMessages});

            // Обновляем массив сообщений с добавленным пользовательским сообщением и ответом сервера
            setMessages((current) => [...current, userMessage, response.data]);

            // Сбрасываем значения формы
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();  // Открытие модального окна при ошибке доступа
            }
        } finally {
            // Обновляем страницу
            router.refresh();
        }
    };


    return (
        <div>
            <Heading
                title="Code Generation"
                description="Generate code using description"
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
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
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl
                                            className="m-0 p-0"
                                        >
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Simple toggle button react hooks."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            } name="prompt"/>
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
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader/>
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started."/>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.content}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                                )}
                            >
                                {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                                <ReactMarkdown
                                    components={{
                                        // Обертка для предварительного форматирования кода
                                        pre: ({node, ...props}) => (
                                            <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                <pre {...props} />
                                            </div>
                                        ),
                                        // Возвращается компонент <code>, который рендерит переданные свойства и узел.
                                        //
                                        //  @param {Object} props - Свойства компонента.
                                        //  @param {React.ReactNode} props.node - Дочерний узел компонента.
                                        //  @returns {React.ReactElement} - Компонент <code>.
                                        code: ({node, ...props}) => (
                                        <code
                                        className="bg-black/10 rounded-lg p-1"
                                    {...props}
                                />
                                )
                                }}
                                className="text-sm overflow-hidden leading-7"
                            >
                                {message.content || ""}
                            </ReactMarkdown>

                            </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodePage;