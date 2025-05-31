import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
