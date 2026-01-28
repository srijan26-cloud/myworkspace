import React from 'react';
import { OSProvider, useOS } from './context/OSContext';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop';

const AppContent = () => {
  const { isLoggedIn } = useOS();
  return isLoggedIn ? <Desktop /> : <LoginScreen />;
};

function App() {
  return (
    <OSProvider>
      <div className="w-full h-full">
        <AppContent />
      </div>
    </OSProvider>
  );
}

export default App;
