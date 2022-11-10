<template>
    <div>
        <p class="text-xl">{{item.title}}</p>
        <p class="text-xl ml-auto">{{item.completed}}</p>
        <div class="ml-auto flex gap-3">
            <button><i class="text-xl text-blue-500 uil uil-edit-alt"></i></button>
            <button><i class="text-xl text-red-400 uil uil-trash-alt"></i></button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item']
}
</script>