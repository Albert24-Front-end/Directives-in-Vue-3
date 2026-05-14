<script setup lang="ts">
import { vLazy } from '../src/vLazy'
import { createPopper } from '@popperjs/core';
// 1. В <script setup> любая переменная, начинающаяся с маленькой 'v',
// становится директивой. vTooltip превращается в v-tooltip в шаблоне.
const vTooltip = {
  // 2. mounted — хук, который срабатывает, когда элемент (h1) вставлен в DOM.
  // el: сам HTML-элемент, к которому привязана директива.
  // binding: объект, содержащий всё, что мы передали в директиву (значение, аргументы, модификаторы).
  mounted(el: Element, binding: {value: string; modifiers: { right: boolean }}) {
    // 3. Извлекаем модификаторы. Если в шаблоне написано v-tooltip.right,
    // то binding.modifiers.right будет true.
    const placement = binding.modifiers.right ? "right" : "top";
    // console.log(binding);
    // 4. Создаем "плавающий" элемент тултипа вручную через чистый JS.
    const tooltip = document.createElement('div');
    tooltip.classList.add("tooltip");
    tooltip.textContent = binding.value; // Берем текст из v-tooltip="'текст'"
    // 5. Тултип нужно добавить в DOM. Добавляем в body, чтобы он не обрезался родительскими overflow: hidden или z-index.
    document.body.appendChild(tooltip);

    // 6. Инициализируем библиотеку Popper.
    // Она берет наш h1 (el) и новый div (tooltip) и высчитывает координаты.
    const popper = createPopper(el, tooltip, {
      placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10], // Отступ 10px от элемента по бокам
          },
        },
      ],
    });

    (el as any)._tooltip = tooltip;
    (el as any)._popper = popper;

    // 7. Навешиваем стандартные обработчики событий.
    el.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
      popper.update(); // Просим Popper пересчитать координаты (вдруг страница прокрутилась)
    });

    el.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  },
  // устраняем утечки памяти и торможение приложения
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