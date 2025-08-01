import { Loader2 } from 'lucide-react'; 

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <p className="mt-4 text-lg font-semibold text-foreground animate-pulse-subtle">Loading crud app ...</p>
    </div>
  );
};

export default Preloader;
