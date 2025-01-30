import OpenAI from "openai";

console.log(import.meta.env.VITE_OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: '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', // ✅ Use "VITE_" prefix in Vite env variables
  dangerouslyAllowBrowser: true,
});

console.log(openai);

export const generateRecipe = async (ingredients) => {
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo", // Use the latest GPT model
      prompt: `Generate a recipe using these ingredients: ${ingredients}`,
      max_tokens: 150,
    });

    console.log(response);
    return response.choices[0].text;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return "Failed to generate recipe. Please try again.";
  }
};
