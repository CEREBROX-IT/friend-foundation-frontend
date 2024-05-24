import { BrowserRouter } from "react-router-dom";
import Unprotected from "./routes/unprotected";
import Protected from "./routes/protected";

function App() {
  return (
    <>
      <BrowserRouter>{true ? <Protected /> : <Unprotected />}</BrowserRouter>
    </>
  );
}

export default App;
