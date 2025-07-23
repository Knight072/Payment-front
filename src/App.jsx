import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import PaymentInfoPage from "./components/PaymentInfoPage";
import SummaryPage from "./components/SummaryPage";
import StatusPage from "./components/StatusPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/info" element={<PaymentInfoPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/status/:id" element={<StatusPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
