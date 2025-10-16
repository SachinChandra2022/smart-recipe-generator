import { Header } from "@/components/Header";
import { IngredientInput } from "@/components/IngredientInput";
import { RecipeList } from "@/components/RecipeList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight">
              What's in your kitchen?
            </h1>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
              Snap a photo of your ingredients, and we'll turn them into a
              delicious meal.
            </p>
          </div>

          <IngredientInput />

          <RecipeList />
        </div>
      </main>
      <footer className="text-center p-6 text-sm text-gray-500 border-t mt-12">
        Smart Recipe Generator &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}