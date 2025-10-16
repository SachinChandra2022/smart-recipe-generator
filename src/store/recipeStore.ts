import { create } from 'zustand';

// Define the structure of a recipe for the frontend
export type Recipe = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  cooking_time_minutes: number;
  difficulty: string;
  score: number;
  missingCount: number;
};

// Define the state and the actions that can modify it
type RecipeState = {
  ingredients: string[];
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  fetchRecipes: () => Promise<void>;
  clearIngredients: () => void;
};

export const useRecipeStore = create<RecipeState>((set, get) => ({
  // Initial state
  ingredients: [],
  recipes: [],
  isLoading: false,
  error: null,

  // Action: Add an ingredient to the list
  addIngredient: (ingredient) => {
    const lowerCaseIngredient = ingredient.toLowerCase().trim();
    if (lowerCaseIngredient && !get().ingredients.includes(lowerCaseIngredient)) {
      set((state) => ({
        ingredients: [...state.ingredients, lowerCaseIngredient],
      }));
    }
  },

  // Action: Remove an ingredient from the list
  removeIngredient: (ingredient) => {
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i !== ingredient),
    }));
  },
  
  // Action: Clear all ingredients
  clearIngredients: () => {
    set({ ingredients: [] });
  },

  // Action: Fetch recipes from our API based on the current ingredients
  fetchRecipes: async () => {
    const { ingredients } = get();
    if (ingredients.length === 0) {
      set({ recipes: [], isLoading: false, error: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/recipes/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes.');
      }

      const data = await response.json();
      set({ recipes: data, isLoading: false });
    } catch (error) {
      console.error(error);
      set({
        error: 'Sorry, something went wrong while fetching recipes.',
        isLoading: false,
      });
    }
  },
}));