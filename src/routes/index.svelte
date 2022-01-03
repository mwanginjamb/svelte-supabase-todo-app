<script lang="ts">
    import supabase from "$lib/db"
    import { onMount, beforeUpdate, onDestroy } from "svelte";
    import type { TodoType } from "../models/todo.interface"
    import { TodoModel } from "$lib/todo.model"
    import Todo  from "../components/Todo.svelte"
    import { fetchTodoList, todoList } from '../stores/todostore'



    let todoRecords: TodoModel[];
    let todo = new TodoModel();

     // Invoke the store methos to fetch todos
     fetchTodoList()

   /* beforeUpdate(() => {
        fetchTodoList();
    }) 

    onDestroy(() => {
        fetchTodoList()
    })*/

   
 
    // Add recativity to specific valuables

    $: {
        todoRecords = [...$todoList]
    }

    

   

   
    const updateTodo = async (todo: TodoType) => {
            try {
                const { data: record, error } = await supabase
                .from('todos')
                .update(todo)
                .eq('id', todo.id)


                const i = todoRecords.findIndex(t => t.id === todo.id)
                        todoRecords[i] = { ...todoRecords[i], ...todo}

               
                console.log(`Updated Record.........`);
                console.table(todoRecords[i]);
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
               
               todoRecords = todoRecords.filter(t => t.id !== TodoID)

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

            console.log(`Inserted Data`);
            console.log(data)

            todoRecords = [...todoRecords, {...data[0]}]
            // Reset the task object

            todo = {};


        }catch(error) {
            console.log(error);
        }
    }
    
</script>

<!-- Add Todo Form -->

<form class="form" on:submit|preventDefault={handleInsert}>
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



