import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// Define the structure of a Recipe for TypeScript
type Recipe = {
  id: string;
  name: string;
  ingredients: { name: string; quantity: string }[];
  // ... other fields are available but not needed for the core logic
};

export async function POST(req: NextRequest) {
  try {
    const { ingredients, dietaryFilters } = await req.json();

    // Basic error handling for invalid input
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: 'Ingredients are required and must be an array.' }, { status: 400 });
    }

    const supabase = createClient();

    // Start building the query to fetch all recipes
    let query = supabase.from('recipes').select('*');

    // Dynamically apply dietary filters if they are provided
    if (dietaryFilters && Array.isArray(dietaryFilters) && dietaryFilters.length > 0) {
      // The 'contains' filter checks if the 'dietary_tags' array column contains all the specified filters
      query = query.contains('dietary_tags', dietaryFilters);
    }

    const { data: allRecipes, error } = await query;

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch recipes from the database.' }, { status: 500 });
    }

    // --- The Matching Algorithm ---
    const scoredRecipes = allRecipes.map((recipe: Recipe) => {
      let matchCount = 0;
      const recipeIngredientNames = recipe.ingredients.map(ing => ing.name.toLowerCase());

      // Check how many of the user's ingredients are in the recipe
      ingredients.forEach((userIngredient: string) => {
        // A simple check to see if the recipe ingredient name includes the user's ingredient
        // This handles cases like "tomato" matching "canned tomatoes"
        if (recipeIngredientNames.some(recipeIng => recipeIng.includes(userIngredient.toLowerCase()))) {
          matchCount++;
        }
      });

      // Score based on what percentage of the RECIPE's ingredients are met by the user's list.
      // This prioritizes recipes that are more complete.
      const completenessScore = recipe.ingredients.length > 0 
        ? (matchCount / recipe.ingredients.length) * 100 
        : 0;
      
      const missingIngredientsCount = recipe.ingredients.length - matchCount;

      return { ...recipe, score: completenessScore, missingCount: missingIngredientsCount };
    });

    // --- Filtering and Sorting ---
    const sortedRecipes = scoredRecipes
      // Only show recipes where the user has at least one matching ingredient
      .filter(recipe => recipe.score > 0)
      // Sort by the highest score first. If scores are equal, sort by the fewest missing ingredients.
      .sort((a, b) => b.score - a.score || a.missingCount - b.missingCount);

    return NextResponse.json(sortedRecipes);

  } catch (e) {
    console.error('Unexpected server error:', e);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}