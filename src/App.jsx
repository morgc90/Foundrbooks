import { Routes, Route } from "react-router-dom";
import Seo from "./components/Seo";
import Home from "./pages/Home";
import SaasAccounting from "./pages/SaasAccounting";
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
        <Route path="/success" element={<Success />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
