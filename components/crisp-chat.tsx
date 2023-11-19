"use client"

import {useEffect} from "react";
import {Crisp} from "crisp-sdk-web";

/**
 * Компонент для инициализации Crisp чата.
 * Использует хук useEffect для вызова функции настройки Crisp при монтировании компонента.
 *
 * @returns {null} - Возвращает null, так как компонент только выполняет инициализацию.
 */
export const CrispChat = () => {
    useEffect(() => {
        // Вызов функции настройки Crisp с передачей идентификатора конфигурации
        Crisp.configure("e8ca8a8d-8b53-42c9-9c3f-dfe92d90a811")
    }, []);

    return null;
}