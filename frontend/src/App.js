import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import DigitalCard from "@/components/DigitalCard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DigitalCard />} />
        </Routes>
      </BrowserRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#111111',
            border: '1px solid #222222',
            color: '#ffffff',
          },
        }}
      />
    </div>
  );
}

export default App;
