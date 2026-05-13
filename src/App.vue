<script setup lang="ts">
import { vLazy } from '../src/vLazy'
import { createPopper } from '@popperjs/core';

const vTooltip = {
  mounted(el: Element, binding: {value: string; modifiers: { right: boolean }}) {
    const placement = binding.modifiers.right ? "right" : "top";
    console.log(binding);
    const tooltip = document.createElement('div');
    tooltip.classList.add("tooltip");
    tooltip.textContent = binding.value;
    document.body.appendChild(tooltip);

    const popper = createPopper(el, tooltip, {
      placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    });

    (el as any)._tooltip = tooltip;
    (el as any)._popper = popper;

    el.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
      popper.update();
    });

    el.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  },
  unmounted(el: HTMLElement) {
    const tooltip = (el as any)._tooltip;
    if (tooltip) {
      tooltip.remove();
    }
  }
}

</script>

<template>
  <h1 class="heading" v-tooltip="'Directive is working'">Directives</h1>
  <h1 class="heading" v-tooltip.right="'Directive is working'">New Directives</h1>
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
  <img width="900" v-lazy="'https://www.pixelstalk.net/wp-content/uploads/2025/08/Nature-wallpaper-for-desktop-aesthetic-an-enchanting-sunset-over-a-tranquil-beach-with-gentle-waves-lapping-at-the-shore.jpg'" />
</template>

<style>
.heading {
  width: fit-content;
  padding: 15px 30px;
  outline: 1px solid skyblue;
}

.tooltip {
  position: absolute;
  display: none;
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 999;
}
</style>