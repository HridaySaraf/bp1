import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import DigitalCard from "@/components/DigitalCard";

function App() {
  return (
    <div className="App">
      <DigitalCard />
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#ffffff',
            border: '1px solid #0066CC',
            color: '#0066CC',
          },
        }}
      />
    </div>
  );
}

export default App;
