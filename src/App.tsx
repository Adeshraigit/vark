import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react';
import RootLayout from './Layout/RootLayout.tsx'
import Vark from './pages/Vark'
import Home from './pages/Home'
import { About } from './pages/About.tsx';
import { Contact } from './pages/Contact.tsx';
import Visual from './pages/Visual.tsx';  
import Audio from './pages/Audio.tsx';
import Read from './pages/Read.tsx';
import Kinesthetic from './pages/Kinesthetic.tsx';
import SignInPage from './components/auth/SignIn.tsx';
import SignUpPage from './components/auth/SignUp.tsx';
import NotFoundPage from './pages/404.tsx';
import Redirect from './pages/redirect.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      }, 
      {
        path: "/questionnaire",
        element: <Vark/>
      },
      {
        path: "/vark",
        element: <Redirect/>
      },
      {
        element: <SignInPage />,
        path: '/sign-in/*'
      },
      {
        element: <SignUpPage />,
        path: '/sign-up/*'
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      }, 
      {
        path: "/Visual",
        element: <Visual/>
      },
      {
        path: "/Aural",
        element: <Audio/>
      },
      {
        path: "/Read/Write",
        element: <Read/>
      },
      {
        path: "/Kinesthetic",
        element: <Kinesthetic/>
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }
]);


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50">
       <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <RouterProvider router={router} />
       </ClerkProvider>
    </div>
  )
}

export default App