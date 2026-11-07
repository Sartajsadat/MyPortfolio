import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/hooks/useTheme';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/HomePage';

export default function App() {
  return (
    <ThemeProvider>
      {/* Respects the visitor's "reduce motion" OS setting */}
      <MotionConfig reducedMotion="user">
        <MainLayout>
          <HomePage />
        </MainLayout>
      </MotionConfig>
    </ThemeProvider>
  );
}
