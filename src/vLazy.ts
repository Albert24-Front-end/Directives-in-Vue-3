const observers = new WeakMap<HTMLImageElement, IntersectionObserver>();

export const vLazy = {
  mounted(el: HTMLImageElement, binding: { value: string }) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        el.src = binding.value;
        observer.unobserve(el);
        observers.delete(el);
      }
    });
    observer.observe(el);
    observers.set(el, observer)
  },
  unmounted(el: HTMLImageElement): void {
    observers.get(el)?.disconnect();
    observers.delete(el);
  },
};
