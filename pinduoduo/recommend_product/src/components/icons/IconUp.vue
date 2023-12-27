<template>
  <svg
    t="1700720843480"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="5959"
    :fill="color"
  >
    <path
      d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z"
      p-id="5960"
    ></path>
  </svg>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    required: true,
    default: "#999",
  },
});
</script>