"use client";

import { useRecipeStore, Recipe } from "@/store/recipeStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Tag, Clock, Users, Star } from "lucide-react";

export function RecipeList() {
  const { recipes, isLoading, error } = useRecipeStore();
  const hasSearched = recipes.length > 0 || isLoading || error;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 text-center mt-20">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <p className="text-lg text-gray-500">Finding the perfect recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 p-8 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-lg text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!hasSearched) {
     return (
        <div className="text-center mt-20 p-8 border-2 border-dashed rounded-lg">
            <p className="text-lg text-gray-500">
              Your recipe suggestions will appear here.
            </p>
        </div>
     );
  }
  
  if (recipes.length === 0) {
    return (
      <div className="text-center mt-20 p-8 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-lg text-yellow-800 font-semibold">
          No recipes found. Try adding more ingredients!
        </p>
      </div>
    );
  }


  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Suggestions</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}


// A new sub-component for better organization
function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="flex flex-col hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <img 
          src={recipe.image_url} 
          alt={recipe.name} 
          className="rounded-t-lg aspect-video object-cover"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl mb-2">{recipe.name}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-3 text-sm text-gray-600">
         <div className="flex items-center gap-2">
            <Tag size={16} className="text-green-600" />
            <span>
              <span className="font-semibold">{Math.round(recipe.score)}%</span> Match
            </span>
         </div>
         <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-600" />
            <span>{recipe.cooking_time_minutes} minutes</span>
         </div>
         <div className="flex items-center gap-2">
            <Users size={16} className="text-purple-600" />
            <span>{recipe.difficulty}</span>
         </div>
      </CardFooter>
    </Card>
  )
}