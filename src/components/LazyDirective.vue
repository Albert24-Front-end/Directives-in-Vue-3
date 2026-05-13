<script setup lang="ts">
const vLazy = {
  mounted(el: HTMLImageElement, binding: { value: string }) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        el.src = binding.value;
        observer.unobserve(el);
      }
    });
    observer.observe(el);
  },
};
</script>

<template>
  <div>
    <h1>Directives</h1>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <img
      width="900"
      v-lazy="
        'https://www.pixelstalk.net/wp-content/uploads/2025/08/Nature-wallpaper-for-desktop-aesthetic-an-enchanting-sunset-over-a-tranquil-beach-with-gentle-waves-lapping-at-the-shore.jpg'
      "
    />
  </div>
</template>
