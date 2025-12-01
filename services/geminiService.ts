import { Transaction } from '../types';

const getSavingsTips = async (expenses: Transaction[]): Promise<string> => {
  if (expenses.length === 0) {
    return "Start by adding some expenses, and I can give you personalized savings tips!";
  }

  try {
    const response = await fetch('/.netlify/functions/get-tips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expenses }),
    });

    if (!response.ok) {
        // Try to parse the error message from the function's response
        const errorData = await response.json().catch(() => ({ message: `Request failed with status ${response.status}` }));
        throw new Error(errorData.message);
    }

    const data = await response.json();
    return data.tips;

  } catch (error) {
    console.error("Error fetching savings tips:", error);
    // The UI component will display this error message.
    if (error instanceof Error) {
        return `There was an error while generating savings tips: ${error.message}. Please try again later.`;
    }
    return "There was an error while generating savings tips. Please try again later.";
  }
};

export default getSavingsTips;
