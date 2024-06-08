import { BrowserRouter, Navigate } from "react-router-dom";
import Unprotected from "./routes/unprotected";
import Protected from "./routes/protected";
import { ThemeProvider } from "./components/ThemeContext";
import JwtDecoder from "./utils/jwt-decoder";
import { useEffect, useState } from "react";
function App() {
  const token = JwtDecoder().isTokenValid;
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (token) {
      setIsloading(false);
    } else {
      setIsloading(false);
      <Navigate to="/" />
    }
  }, [token]);

  
  
  return (
    <>
      {isLoading ? undefined : (
        <ThemeProvider>
          <BrowserRouter>
            {token ? <Protected /> : <Unprotected />}
          </BrowserRouter>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
