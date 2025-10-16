import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fs from 'fs';
import path from 'path';

const recipes = JSON.parse(fs.readFileSync(path.resolve('./scripts/recipes.json')));

// Use the SERVICE KEY for admin tasks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // <-- CHANGE HERE

if (!supabaseUrl || !supabaseServiceKey) { // <-- CHANGE HERE
  throw new Error("Supabase URL or Service Key is missing. Check .env.local");
}

// Initialize client with the SERVICE KEY
const supabase = createClient(supabaseUrl, supabaseServiceKey); // <-- CHANGE HERE

async function seedDatabase() {
  console.log('Seeding database...');

  // Step 1: Delete all existing recipes.
  console.log('Deleting existing recipes...');
  const { error: deleteError } = await supabase
    .from('recipes')
    .delete()
    .neq('name', 'this-will-never-be-the-name'); 

  if (deleteError) {
    console.error('Error deleting existing data:', deleteError);
    return;
  }
  console.log('Existing recipes deleted.');


  // Step 2: Insert the new recipes from our JSON file.
  console.log('Inserting new recipes...');
  const { data, error: insertError } = await supabase
    .from('recipes')
    .insert(recipes)
    .select();

  if (insertError) {
    console.error('Error inserting new data:', insertError);
  } else {
    console.log(`Successfully inserted ${data.length} recipes.`);
  }
}

seedDatabase();