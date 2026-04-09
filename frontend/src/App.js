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
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff',
          },
        }}
      />
    </div>
  );
}

export default App;
