<template>
    <nav class="h-screen w-24 flex flex-col justify-between p-2 bg-neutral">
        <div>
            <img src="" alt="">
        </div>
        
        <ul class="flex flex-col h-1/4 justify-between">
            <li><Button @click="$router.push('/')" class="w-full"><img class="w-full" src="../assets/imgs/icons/search.svg" alt=""></Button></li>
            <li><Button @click="$router.push('/create')" class="w-full"><img class="w-full" src="../assets/imgs/icons/plus.svg" alt=""></Button></li>
            <li><Button class="w-full"><img class="w-full" src="../assets/imgs/icons/calendar.svg" alt=""></Button></li>
        </ul>
        <Button class="w-full btn-ghost"><img class="w-full" src="../assets/imgs/icons/exit.svg" alt=""></Button>
    </nav>
</template>
<script>
import Button from './Button.vue';
export default {
    components: {
        Button
    }
}
</script>