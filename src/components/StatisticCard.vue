<template>

<div class="card shadow-sm border-0">

    <div class="card-body">

        <h6 class="text-muted">

            {{ title }}

        </h6>

        <h2 class="fw-bold">

            {{ value }}

        </h2>

    </div>

</div>

</template>

<script setup>

defineProps({

    title:String,

    value:Number

})

</script>