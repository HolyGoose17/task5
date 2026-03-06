// Базовая функция создания стора из zustand
import { create, type StateCreator } from 'zustand';
// Middleware:
// persist — сохраняет состояние в storage (например localStorage)
// devtools — подключает Redux DevTools
// createJSONStorage — обертка для корректной работы с JSON-хранилищем
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
// immer — позволяет "мутировать" state напрямую (под капотом создаётся immutable-копия)
import { immer } from 'zustand/middleware/immer';

// ==========================
// Тип одного сниппета
// ==========================

interface ITodo {
  id: number; // уникальный идентификатор
  todo: string; // текст задачи
  completed: boolean; // выполнена ли задача
  userId: number; // id пользователя (приходит с API)
}

// ==========================
// Описание всех экшенов стора
// ==========================

interface IActions {
  fetchTodos: () => Promise<void>; // загрузка задач с сервера
  completeTodo: (id: number) => void; // переключение статуса задачи
  deleteTodo: (id: number) => void; // удаление задачи
}

// ==========================
// Базовое состояние
// ==========================
interface IInitialState {
  todos: ITodo[]; // массив задач
  isLoading: boolean; // индикатор загрузки
}

// Итоговый тип стора = state + actions
interface ITodoState extends IInitialState, IActions {}

// ==========================
// Начальное состояние
// ==========================
const initialState: IInitialState = {
  todos: [],
  isLoading: false,
};

// ==========================
// Создание StateCreator
// Здесь мы описываем:
// - initial state
// - actions
// ==========================

// Указываем типизацию middleware (immer, devtools, persist)
const TodoStore: StateCreator<
  ITodoState,
  [['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  // Раскрываем начальное состояние
  ...initialState,

  // ==========================
  // Загрузка задач с API
  // ==========================
  fetchTodos: async () => {
    // Включаем индикатор загрузки
    // 2-й параметр (false) — не заменять state полностью
    // 3-й параметр — имя экшена для Redux DevTools
    set({ isLoading: true }, false, 'fetchTodos');

    try {
      const response = await fetch('https://dummyjson.com/todos?limit=10');
      const data = await response.json();

      // Записываем полученные задачи в store
      set({ todos: data.todos }, false, 'fetchTodos/success');
    } catch (error) {
      console.error('Error fetching todos:', error);

      // Если ошибка — очищаем список
      set({ todos: [] }, false, 'fetchTodos/failed');
    } finally {
      // В любом случае выключаем загрузку
      set({ isLoading: false }, false, 'fetchTodos/finally');
    }
  },

  // ==========================
  // Переключение completed
  // ==========================
  completeTodo: (id: number) => {
    // Благодаря immer мы можем "мутировать" state напрямую
    set(
      (state) => {
        // Находим задачу по id
        const todo = state.todos.find((todo: ITodo) => todo.id === id);

        // Если нашли — переключаем флаг
        if (todo) {
          todo.completed = !todo.completed;
        }
      },
      false,
      'completeTodo'
    );
  },

  // ==========================
  // Удаление задачи
  // ==========================
  deleteTodo: (id: number) => {
    set(
      (state) => {
        // Находим индекс задачи
        const index = state.todos.findIndex((todo: ITodo) => todo.id === id);

        // Если нашли — удаляем через splice
        // (это безопасно благодаря immer)
        if (index !== -1) {
          state.todos.splice(index, 1);
        }
      },
      false,
      'deleteTodo'
    );
  },
});

// ==========================
// Создание стора с middleware
// Порядок важен:
// immer → devtools → persist
// ==========================
const useTodoStore = create<ITodoState>()(
  immer(
    devtools(
      persist(TodoStore, {
        name: 'todo-storage', // ключ в localStorage

        // указываем, что используем localStorage
        storage: createJSONStorage(() => localStorage),

        // partialize — сохраняем только часть state
        // В данном случае сохраняем только todos,
        // а isLoading не будет сохраняться
        partialize: (state) => ({
          todos: state.todos,
        }),
      })
    )
  )
);

// ==========================
// Селекторы
// ==========================

// Хук для получения todos
export const useTodos = () => useTodoStore((state) => state.todos);

// Хук для получения isLoading
export const useIsLoading = () => useTodoStore((state) => state.isLoading);

// Вызов экшенов вне компонентов (через getState)
export const fetchTodos = () => useTodoStore.getState().fetchTodos();

export const completeTodo = (id: number) => useTodoStore.getState().completeTodo(id);

export const deleteTodo = (id: number) => useTodoStore.getState().deleteTodo(id);
