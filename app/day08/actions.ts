"use server";

let todos: { id: number; text: string; completed: boolean }[] = [];
let nextId = 1;

interface AddTodoResult {
    success: boolean;
    message: string;
    newTodo?: { id: number; text: string; completed: boolean };
    todos?: { id: number; text: string; completed: boolean }[];
}
/**
 * TODOを追加するServer Action
 * useActionState のアクション関数として使用されることを想定
 * @param prevState 前の状態（useActionStateのstate）
 * @param formData フォームから送信されたデータ
 * @returns AddTodoResult オブジェクト
 */
export async function addTodo(
    prevState: AddTodoResult,
    formData: FormData
): Promise<AddTodoResult> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1秒待つ 意図的な遅延

    const todoText = formData.get("todoText") as string;
    if (!todoText || todoText.trim() === "") {
        return {
            success: false,
            message: "TODOの内容を入力してください。",
            todos: todos
        };
    }

    const newTodo = {
        id: nextId++,
        text: todoText.trim(),
        completed: false
    };

    todos.push(newTodo);
    return {
        success: true,
        message: "TODOを追加しました。",
        newTodo: newTodo,
        todos: todos
    };
}
/**
 * 現在のTODOリストを返すServer Action (デバッグ用)
 */

export async function getTodos() : Promise<{id: number; text: string; completed: boolean}[]> {
    return todos;
}

export async function resetTodos() : Promise<{ success: boolean; message: string }> {
    todos = []
    nextId = 1;
    console.log("TODOリストをリセットしました。");
    return  { success: true, message: "TODOリストがリセットされました。" };
}