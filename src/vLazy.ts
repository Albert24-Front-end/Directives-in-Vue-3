// 1. Создаем WeakMap для хранения связей «Элемент -> Обзреватель».
// WeakMap хорош тем, что если элемент <img> будет удален из DOM,
// запись о нем автоматически сотрется из памяти (сборщик мусора его «подберет»).
const observers = new WeakMap<HTMLImageElement, IntersectionObserver>();

export const vLazy = {
  // 2. Срабатывает, когда <img> вставлен в дерево.
  mounted(el: HTMLImageElement, binding: { value: string }) {
    // 3. Создаем "наблюдателя".
    // [entry] — это деструктуризация массива записей о пересечении.
    const observer = new IntersectionObserver(([entry]) => {
      // 4. entry.isIntersecting — станет true, как только хотя бы один пиксель картинки покажется на экране.
      if (entry?.isIntersecting) {
        // 5. Тот самый момент "ленивой" загрузки: присваиваем src значение из директивы (v-lazy="'url'").
        el.src = binding.value;
        // 6. Как только картинка начала грузиться, наблюдать за ней больше нет смысла.
        observer.unobserve(el);
        observers.delete(el); // Удаляем из нашего хранилища
      }
    });
    // 7. Говорим обзерверу: "Начни следить за этим <img>".
    observer.observe(el);
    // 8. Сохраняем экземпляр обзервера, чтобы иметь к нему доступ при удалении.
    observers.set(el, observer);
  },
  // 9. Срабатывает, когда картинка удаляется из DOM (например, при смене страницы).
  unmounted(el: HTMLImageElement): void {
    // 10. Если мы не успели доскроллить до картинки, а её уже удалили,
    // нужно вручную "выключить" обзервер, чтобы не было утечек памяти.
    observers.get(el)?.disconnect();
    observers.delete(el);
  },
};
