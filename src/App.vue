<script setup lang="ts">
import ChatMain from './components/ChatMain/ChatMain.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
</script>

<template>
  <section class="chat-app">
    <Sidebar />

    <ChatMain />
  </section>
</template>

<style lang="scss" scoped>
.chat-app {
  display: flex;
}
</style>
