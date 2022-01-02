<script lang="ts">
     import type { TodoType } from "../models/todo.interface"
     import { complete } from "$lib/complete"
    export let todo: TodoType , updateTodo, deleteTodo
</script>

 <div class="todos">
    <input type="checkbox" name="done" checked={todo.done} on:change="{
        (e) => {
            console.log(`current value is: ${e.currentTarget.checked}`);
            let date = new Date();
            let completionDate = date.toISOString();
            todo = {...todo, 'done': e.currentTarget.checked, 'done_at': completionDate}
            console.log(`payload...................`)
            console.table(todo)
            updateTodo(todo)
        }
    }" />


    <input use:complete={ todo.done } type="text" value="{todo.task}" on:blur="{(e) => {
        todo = { ...todo, 'task': e.currentTarget.value }
        updateTodo(todo)
    }}" />


    <button on:click|once|preventDefault="{ () =>{deleteTodo(todo.id)}}">Delete</button>
</div>



<style>
    .todos {
        display: flex;
        gap: 10px;
        max-width: 800px;
    }

    input {
        outline: none;
        border: 1px solid #ccc;
        padding: 5px 10px;
        margin: 5px 0;
        display: block;
        width: 100%;
    }

    button {
        outline: none;
        padding: 2px 10px;
        margin-top: 5px;
        border: none;
        color:#fff;
        background-color: rgba(31, 134, 95, 0.9);
        cursor: pointer;
    }
</style>