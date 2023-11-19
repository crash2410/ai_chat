/**
 * Функция useProModal создает кастомный хук с использованием библиотеки Zustand.
 * Хук возвращает объект с тремя свойствами: isOpen, onOpen и onClose.
 *
 * @returns объект с состоянием модального окна и функциями для его открытия и закрытия
 */
import { create } from "zustand";

interface useProModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
    isOpen: false,
    /**
     * Функция onOpen устанавливает состояние isOpen в true.
     */
    onOpen() {
        set({ isOpen: true });
    },
    /**
     * Функция onClose устанавливает состояние isOpen в false.
     */
    onClose() {
        set({ isOpen: false });
    },
}));