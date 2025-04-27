
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as BrouserRouter } from 'react-router-dom';
import ChatProvider from './Context/ChatProvider';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrouserRouter>
    <ChatProvider>
        <ChakraProvider >
          <App />
        </ChakraProvider>
    </ChatProvider>
  </BrouserRouter>
  //document.getElementById("root")
);