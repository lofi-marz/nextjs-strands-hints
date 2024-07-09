import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { cache } from 'react';
import 'server-only';
import { HintsSchema } from './types';
const AZURE_TOKEN = process.env.AZURE_AI_TOKEN ?? '';
const AZURE_URL = process.env.AZURE_AI_URL ?? '';
function createPrompt(words: string[]) {
    const prompt = `
    I am creating a puzzle game. 
I will give you a list of words.
You are to return a JSON object where each key is the word exactly as provided, and each value is
A hint as to what that word is without using or mentioning the word. 
The hint should not be too easy, but not too hard, and should be just one sentence. Only return the JSON in raw text format, without saying anything else, or formatting the response in a code block.
Here is the list of words:
    ${words}`;

    return prompt;
}
export const getHints = cache(async function getHints(words: string[]) {
    console.log('Getting hints', words);
    const prompt = createPrompt(words);
    const client = new OpenAIClient(
        AZURE_URL,
        new AzureKeyCredential(AZURE_TOKEN)
    );
    const deploymentName = 'gpt-4o';
    try {
        const res = await client.getChatCompletions(deploymentName, [
            { role: 'user', content: prompt },
        ]);

        return HintsSchema.parse(
            JSON.parse(res.choices[0].message?.content ?? '{}')
        );
    } catch (e) {
        console.error(e);
        return {};
    }
});
