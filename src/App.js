import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Company from "./pages/Company";
import People from "./pages/pepole";
import Error from "./pages/Error";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/people" element={<People />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/erro" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
