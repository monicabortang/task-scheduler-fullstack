<template>

<div class="d-flex">

    <Sidebar/>

    <div class="flex-grow-1">

        <Navbar/>

        <main class="p-4">

            <slot/>

        </main>

    </div>

</div>

</template>

<script setup>

import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";

</script>