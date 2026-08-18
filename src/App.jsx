import { Routes, Route } from "react-router-dom";
import Seo from "./components/Seo";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import SaasAccounting from "./pages/SaasAccounting";
import RdTaxCredits from "./pages/RdTaxCredits";
import VatDigitalServices from "./pages/VatDigitalServices";
import IrelandVsUk from "./pages/IrelandVsUk";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <>
      <Seo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saas-accounting" element={<SaasAccounting />} />
        <Route path="/rd-tax-credits" element={<RdTaxCredits />} />
        <Route path="/vat-digital-services" element={<VatDigitalServices />} />
        <Route path="/ireland-vs-uk-company" element={<IrelandVsUk />} />
        <Route path="/success" element={<Success />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
    </>
  );
}
