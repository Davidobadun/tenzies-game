//console.log("Anthropic API Key:", import.meta.env.VITE_ANTHROPIC_API_KEY);

//Import Anthropic SDK
import Anthropic from "@anthropic-ai/sdk"

// Import Hugging Face SDK
import { HfInference } from '@huggingface/inference';


const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;



// Initialize Anthropic Inference Client
const anthropic = new Anthropic({
    // Make sure you set an environment variable in Scrimba 
    // for ANTHROPIC_API_KEY
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,

    dangerouslyAllowBrowser: true,
})

export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
        });
        return msg.content[0].text
    } catch (err) {
        console.error("Anthropic Error: ", err.message);
    }
}


// Initialize Hugging Face Inference Client
const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_API_KEY);

// Function to Get Recipe Using Mistral Model
export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
