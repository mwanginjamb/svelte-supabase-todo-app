<script lang="ts">
    import supabase from "$lib/db"
    import { onMount } from "svelte";
    import type { TodoType } from "../models/todo.model"

    let todoRecords: TodoType[];

    onMount( async () => {
        
            let { data: todos, error } = await supabase.from('todos').select('*');
            todoRecords =  todos;

    } );
    
</script>

{#if todoRecords}

    {#each todoRecords as todo (todo.id) }
        <div>
            <input type="checkbox" name="done" checked={todo.done}>
            <input type="text" value="{todo.task}">
            <button>Delete</button>
        </div>
    {/each}

{:else}
    <p>No todos to display.</p>
{/if}