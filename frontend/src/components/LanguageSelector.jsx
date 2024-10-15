import { useEffect } from 'react';

const LanguageSelector = () => {
  useEffect(() => {
    // Check if the Google Translate script is already added
    const existingScript = document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
    
    // If the script is not added, append it
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);

      // Define the translate element function
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'ta,en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        }, 'google_translate_element');
      };
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default LanguageSelector;
