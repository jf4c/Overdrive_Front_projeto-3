import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Company from "./pages/Company";
import People from "./pages/pepole";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/company" element={<Company />} />
          <Route path="/people" element={<People />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
