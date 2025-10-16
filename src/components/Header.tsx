import { ChefHat } from "lucide-react";

export function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b bg-white/50 backdrop-blur-sm sticky top-0">
      <div className="container mx-auto flex items-center gap-2">
        <ChefHat className="h-6 w-6 text-green-600" />
        <span className="font-bold text-lg text-gray-800">
          Smart Recipe Generator
        </span>
      </div>
    </header>
  );
}