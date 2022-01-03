import { writable } from 'svelte/store'
import supabase from "$lib/db"
import type { TodoModel } from "$lib/todo.model"

let loaded = false;
 
export const todoList = writable([]);

export const fetchTodoList = async () => {

    if(loaded) return;
    // Fetch todos and set the todoList store.
    
        try {
            let { data: todos, error } = await supabase.from('todos').select('*');
        
            // Load Data to the store
            todoList.set([...todos]);
            console.log('Todos in store...........');
            console.log(todos)
            loaded = true
        } catch (error) {
            console.log(error);
        }
    
} 