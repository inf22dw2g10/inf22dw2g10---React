import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import Store from "./pages/Store";
import Login from "./pages/Login";
import Game from "./pages/Game";
import NotFoundPage from "./pages/NotFoundPage"
import Register from "./pages/Register";
import { AuthContextProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Profile from "./pages/Profile";
import Layout from "./components/Layout/Layout";
import AdminDashBoard from './pages/AdminDashboard'
import EditProfile from "./pages/EditProfile";

 
function App() {
  const client = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <Layout>
                <Routes>
                  <Route exact path="/" element={<Store/>} />
                  <Route path="/game/:gameId" element={<Game/>}/>
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
                  <Route path="/profile/:userId"
                    element={
                      <ProtectedRoute accessBy="authenticated">
                        <Profile/>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route path="/editProfile"
                    element={
                      <ProtectedRoute accessBy="authenticated">
                        <EditProfile/>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route path="/admin"
                    element={
                      <ProtectedRoute accessBy="admin">
                        <AdminDashBoard/>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
                </Layout>
        </AuthContextProvider>
    </QueryClientProvider>
    </Router>
  );
}
 
export default App;