import React from 'react';
// import { BrowserRouter } from 'react-router-dom';

// import Routes from './routes';
import GlobalStyle from './styles/global';

import SignIn from './pages/Signin';

import AppProvider from './hooks';

import { ToastProvider } from './hooks/toast';

const App: React.FC = () => (
  <>
    {/* <BrowserRouter>
        <Routes />
        <GlobalStyle />
    </BrowserRouter> */}
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
