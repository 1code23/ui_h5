<script setup>
import { ref } from "vue";
import { Observable } from "rxjs";

const textNode = ref(0);

const observable = new Observable((subscriber) => {
  subscriber.next("Hey!");
});
observable.subscribe((val) => {
  textNode.value = val;
});

import { storeToRefs } from "pinia";

import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();

const { count, doubleCount } = storeToRefs(store);
console.log(store);
</script>

<template>
  <div>
    <p style="color:red">{{ textNode }}</p>

    {{ count }}

    <p>{{ doubleCount }}</p>

    <button type="button" @click="store.increment">增加</button>
  </div>
</template>
