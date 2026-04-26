import { AppRouter, RootProvider } from 'providers';

export default function App() {
  return (
    <RootProvider>
      <AppRouter />
    </RootProvider>
  );
}
