import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OSProvider, useOS } from './context/OSContext';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop';

const AppContent = () => {
  const { isLoggedIn } = useOS();
  return (
    <AnimatePresence mode="wait">
      {isLoggedIn ? (
        <motion.div
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full"
        >
          <Desktop />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full"
        >
          <LoginScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
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
