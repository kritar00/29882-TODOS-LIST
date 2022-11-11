<template>
    <form class="w-3/4 mx-auto p-9 flex justify-around shadow-md" action="">
        <input class="w-3/4 shadow-lg" type="text" v-model="todo" name="todoItem" id="todo-input">
        <button class="btn" type="" @click.prevent="postData(todo)">ADD</button>
    </form>
</template>

<script>
export default {
    props: ['postData'],
    data() {
        return {
            todo: ""
        }
    }
}
</script>

