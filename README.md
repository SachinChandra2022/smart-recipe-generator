# Smart Recipe Generator

An intuitive web application that suggests recipes based on images of available ingredients. This project was developed as a technical assessment for a Software Engineer position.

**[➡️ Deployed Version](https://smart-recipe-generator-1brp.vercel.app/)**

*Note: The live demo may take a moment to start on a free hosting service.*

![Smart Recipe Generator Screenshot]((https://github.com/SachinChandra2022/smart-recipe-generator/blob/main/image.png))

---

## ✨ Features

-   **📸 Image-Based Ingredient Recognition:** Upload a photo of your ingredients, and the app will identify them using the Clarifai AI API.
-   **🍳 Smart Recipe Matching:** A scoring algorithm finds and suggests the best recipes from our database based on your available ingredients.
-   **⏳ Dynamic User Experience:** Includes clear loading states while the AI is processing and handles potential errors gracefully.
-   **📱 Fully Responsive Design:** The interface is clean, intuitive, and works beautifully on both desktop and mobile devices.

---

## 🛠️ Tech Stack

-   **Frontend Framework:** [Vue 3](https://vuejs.org/) (using the Composition API)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **UI Component Library:** [PrimeVue](https://primevue.org/)
-   **AI / Machine Learning:** [Clarifai Food Recognition API](https://www.clarifai.com/)
-   **Hosting:** Deployed on [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/) (Choose one)

---

## 🎯 My Approach (Technical Write-up)

My primary goal was to build a robust, user-friendly prototype that effectively demonstrates modern web development practices within the given timeframe.

I chose **Vue 3 with the Composition API and Vite** for its outstanding developer experience, performance, and clean, reactive state management. This allowed for a well-structured and maintainable codebase. For the user interface, I integrated **PrimeVue**, a comprehensive component library, to rapidly build a clean, responsive, and accessible interface without the overhead of writing extensive custom CSS.

The core feature, ingredient recognition, is powered by the **Clarifai Food Recognition API**. Integrating a powerful, pre-trained model was a strategic decision to focus development time on the application's logic and user experience rather than building a custom ML model from scratch.

The recipe matching logic uses a simple but effective scoring system. It calculates a match percentage for each recipe based on the detected ingredients and sorts the results to ensure the most relevant suggestions are always shown first.

---

## 🚀 Getting Started Locally

To run this project on your local machine, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/vue-recipe-app.git
cd vue-recipe-app
```
### 2. Install dependencies
```bash
npm install
```
### 3. Set up environment variables
You'll need an API key from Clarifai to use the ingredient recognition feature.
  1. Create a new file in the root of the project named .env.local.
  2. Add your API key to this file.
### 4. Run the development server
```bash
npm run dev
```
The application should now be running on http://localhost:5173.


