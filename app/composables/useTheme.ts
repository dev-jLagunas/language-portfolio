export const useTheme = () => {
  const { locale, setLocale } = useI18n();

  type LocaleCode = "en" | "es" | "jp" | "fr";

  const currentTheme = ref(`theme-${locale.value}`);
  const isChangingLanguage = useState<boolean>("is-changing-lang", () => false);

  watch(
    locale,
    (newLocale) => {
      currentTheme.value = `theme-${newLocale}`;
    },
    { immediate: true },
  );

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
