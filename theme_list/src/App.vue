<template>
  <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view v-else />
</template>


