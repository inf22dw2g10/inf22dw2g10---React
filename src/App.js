/*import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useContext } from "react";
import Store from './pages/Store'
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import { AuthContext } from "./providers/AuthProvider";
import AuthProvider from './providers/AuthProvider';


const App = () => {
  const client = new QueryClient();
  
  return (
    <div className='App'>
      <Router>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <Navbar/>
            <Routes>
              <Route exact path="/" Component={Store} />
              <Route exact path="/game/:gameId" Component={Game} />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route path="*" Component={NotFound} />
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </div>
  );
};

export default App;

/*
try{
  const response = await axios.post(
    "http://localhost:3000/users/login",
    {
      userid:userId,
      password:password
    },{ withCredentials: true }
  )

}catch(error){
  
}
*/

import Layout from "./components/Layout";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import Store from "./pages/Store";
import Login from "./pages/Login";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound"
import Register from "./pages/Register";
import { AuthContextProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckLogin from "./components/CheckLogin";
 
function App() {
  const client = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
            <Layout>
              <Routes>
                <Route path="/game/:gameId" element={<Game/>}/>
                <Route exact path="/" element={<Store/>} />
                <Route path="/check-login"
                  element={
                    <ProtectedRoute accessBy="non-authenticated">
                      <CheckLogin/>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route path="/login"
                  element={
                    <ProtectedRoute accessBy="non-authenticated">
                      <Login />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route path="/register"
                  element={
                    <ProtectedRoute accessBy="non-authenticated">
                      <Register />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
            </Layout>
      </AuthContextProvider>
    </QueryClientProvider>
    </Router>
  );
}
 
export default App;