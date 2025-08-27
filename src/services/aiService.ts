import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface SheetUpdate {
    cell: string;
    value: number;
    description: string;
}

export const parseCommand = async(message: string): Promise<SheetUpdate | null> => {
    try {
        const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash-lite'});
        const prompt = `
        You are a helpful assistant that parses natural language commands to update a google sheet.
        Parse the request and ONLY return a JSON object with this exact format:
        {
            "cell": "C8",
            "value": 4000,
            "description": "Dine-In Sales updated to $4,000"
        }
        
        The user can update these metrics:
        - Dine-In Sales: C8
        - Delivery Sales: C9
        - Other Income (Catering/ Events): C10
        - Less: Sales Tax: C11
        - Less: Tips Paid: C12
        - Food Cost: C16
        - Beverage Cost: C17
        - Salaried Staff: C20
        - Temp / Hourly Staff: C21
        - Rent / Lease: C24
        - Utilities: C25
        - Internet & Phone: C26
        - Software Subscriptions: C27
        - Insurance: C28
        - Loan Repayments: C29
        - Others Fixed Expenses: C30
        - One-time Repairs / Maintenance: C33
        - Deep Cleaning / Pest Control: C34
        - Equipment Rentals / Lease: C35
        - Miscellaneous OpEx: C36

        User message: ${message}"

        If the message is not a valid update command, return null.
        Return ONLY the JSON object or null. Do not include any other text or comments.
        `;

        console.log('Sending to AI:', message);

        const result = await model.generateContent(prompt);
        const response = result.response.text().trim();

        console.log('AI Response:', response);

        if (response === 'null' || response === null){
            return null;
        }

        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return null;
        }
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('Parsed result:', parsed);
        return parsed;
    } catch (error) {
        console.error('Error parsing command:', error);
        return null;
    }
}