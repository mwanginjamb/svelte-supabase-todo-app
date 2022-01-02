<script lang="ts">
    import supabase from "$lib/db"
    import { onMount, beforeUpdate } from "svelte";
    import type { TodoType } from "../models/todo.interface"
    import { TodoModel } from "$lib/todo.model"
    import Todo  from "../components/Todo.svelte"
    let todoRecords: TodoType[];
    let todo= new TodoModel();


    

    onMount( async () => {
           await getAllTodos();
    } );

    const getAllTodos = async () => {
        try {
            let { data: todos, error } = await supabase.from('todos').select('*');
            todoRecords =  todos;
            console.log(`Getting all todos .......`);
            console.table(todoRecords);
        } catch (error) {
            console.log(error);
        }
    }

    const updateTodo = async (todo: TodoType) => {
            try {
                const { data, error } = await supabase
                .from('todos')
                .update(todo)
                .eq('id', todo.id)
                console.log(`Results of update`);
                console.table(data[0]);
                await getAllTodos();
            } catch(error) {
                console.log(error);
            }            
    }

    // Delete a todo

    const deleteTodo = async (TodoID: number) => {
        try {
            const { data , error } = await supabase
                .from('todos')
                .delete()
                .eq('id', TodoID)
                await getAllTodos();
                console.log(`Deleted Row: `);
                console.table(data)

            } catch(error) {
                console.log(error);
            }   
    }

    // Insert a todo

    const handleInsert = async () => {
        
        try {   
            const { data, error } = await supabase
            .from('todos')
            .insert([
                {task: todo.task},
            ])

            // Refresh List
            await getAllTodos();

            console.log(`Inserted Data`);
            console.log(data)

        }catch(error) {
            console.log(error);
        }
    }
    
</script>

<!-- Add Todo Form -->

<form class="form" on:submit|once|preventDefault={handleInsert}>
    <input type="text" bind:value={todo.task } />
    <button type="submit">Add Task</button>
</form>

{#if todoRecords}

    {#each todoRecords as todo (todo.id) }
       <Todo  {todo} {updateTodo} {deleteTodo}  />
    {/each}

{:else}
    <p>No todos to display.</p>
{/if}



