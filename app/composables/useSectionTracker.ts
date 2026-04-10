export const useSectionTracker = () => {
  const activeIndex = useState<number>("active-section-index", () => 0);

  const setActiveIndex = (index: number) => {
    activeIndex.value = index;
  };

  return {
    activeIndex,
    setActiveIndex,
  };
};
