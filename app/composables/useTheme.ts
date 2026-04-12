export const useTheme = () => {
  const { locale, setLocale } = useI18n();

  type LocaleCode = "en" | "es" | "jp" | "fr";

  const currentTheme = computed(() => `theme-${locale.value}`);
  const isChangingLanguage = ref(false);

  const changeLanguage = async (newLocale: LocaleCode) => {
    if (newLocale === locale.value) return;

    isChangingLanguage.value = true;

    try {
      await setLocale(newLocale);
      await nextTick();

      setTimeout(() => {
        isChangingLanguage.value = false;
      }, 150);
    } catch (error) {
      isChangingLanguage.value = false;
    }
  };

  return {
    currentTheme,
    isChangingLanguage,
    changeLanguage,
    locale,
  };
};
