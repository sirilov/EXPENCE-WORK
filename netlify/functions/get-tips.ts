// This is a Netlify Function that acts as a secure proxy to the Google Gemini API.
// It is written in TypeScript and will be automatically compiled by Netlify.

import { GoogleGenAI } from "@google/genai";
import type { Handler, HandlerEvent } from "@netlify/functions";
import type { Transaction } from '../../types';

const createPrompt = (expenses: Transaction[]): string => {
    const expenseSummary = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);

    const formattedExpenses = Object.entries(expenseSummary)
        .map(([category, amount]) => `- ${category}: $${amount.toFixed(2)}`)
        .join('\n');

    return `
    Based on the following monthly expense summary, provide 3-5 actionable and personalized savings tips. 
    Make the tips encouraging and easy to understand. Format the response as a list.

    My Expenses:
    ${formattedExpenses}
  `;
};

const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY environment variable not set for Netlify function.");
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server configuration error: API key is not set.' }),
        };
    }
  
    try {
        const { expenses } = JSON.parse(event.body || '{}') as { expenses: Transaction[] };

        if (!expenses || !Array.isArray(expenses)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid or missing expenses data in request body.' }),
            };
        }
    
        if (expenses.length === 0) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tips: "Start by adding some expenses, and I can give you personalized savings tips!" }),
            };
        }

        const ai = new GoogleGenAI({ apiKey });
        const prompt = createPrompt(expenses);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const tips = response.text ?? "Sorry, I couldn't generate any tips at the moment.";

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tips }),
        };
    } catch (error) {
        console.error('Error in get-tips function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An internal error occurred while generating savings tips.' }),
        };
    }
};

export { handler };
