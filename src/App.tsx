import { BrowserRouter } from "react-router-dom";
import Unprotected from "./routes/unprotected";
import Protected from "./routes/protected";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>{true ? <Protected /> : <Unprotected />}</BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
