"use client";

import { useState } from "react";
import { useRecipeStore } from "@/store/recipeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Upload } from "lucide-react";

export function IngredientInput() {
  const [inputValue, setInputValue] = useState("");
  const { ingredients, addIngredient, removeIngredient, fetchRecipes } = useRecipeStore();

  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      addIngredient(inputValue);
      setInputValue("");
    }
  };
  
  const handleFindRecipes = () => {
    fetchRecipes();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg">Your Ingredients</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="e.g., chicken, tomatoes, pasta"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
            className="flex-grow"
          />
          <Button onClick={handleAddIngredient}>Add</Button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[40px] mb-6">
          {ingredients.map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="text-md py-1 px-3">
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="ml-2 rounded-full hover:bg-gray-300 p-0.5"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleFindRecipes}
            disabled={ingredients.length === 0}
            className="flex-grow text-lg py-6"
          >
            Find Recipes
          </Button>
          <Button variant="outline" className="flex-grow text-lg py-6">
            <Upload className="mr-2 h-5 w-5" />
            Upload Photo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}