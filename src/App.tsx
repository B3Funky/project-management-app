import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import { Footer } from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
