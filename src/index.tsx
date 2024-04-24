import ReactDOM from 'react-dom';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar/translation.json';
import en from './locales/en/translation.json';
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n';
import { AppRoutes } from './app/routing/AppRoutes';
import { AuthProvider, setupAxios } from './app/modules/auth';
import ThemeSelector from './theme/ThemeSelector';
import './_metronic/assets/sass/style.react.scss';

// Initialize axios interceptors
setupAxios(axios);

// Register Chart.js plugins
Chart.register(...registerables);

// Initialize React Query client
const queryClient = new QueryClient();

// Set language direction and initialize i18n
const initializeLanguage = () => {
  const lang = localStorage.getItem('LANGUAGE') || 'ar';
  document.dir = lang === 'en' ? 'ltr' : 'rtl';
  localStorage.setItem('LANGUAGE', lang);

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    lng: lang || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnEmptyString: false
  });
};

// Initialize language settings
initializeLanguage();

// Render the app
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <MetronicI18nProvider>
      <AuthProvider>
        <ThemeSelector>
          <AppRoutes />
        </ThemeSelector>
      </AuthProvider>
    </MetronicI18nProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
