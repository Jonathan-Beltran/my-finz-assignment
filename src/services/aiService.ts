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
        - Dine-In Sales: B8
        - Delivery Sales: B9
        - Other Income (Catering/ Events): B10
        - Less: Sales Tax: B11
        - Less: Tips Paid: B12
        - Food Cost: B16
        - Beverage Cost: B17
        - Salaried Staff: B20
        - Temp / Hourly Staff: B21
        - Rent / Lease: B24
        - Utilities: B25
        - Internet & Phone: B26
        - Software Subscriptions: B27
        - Insurance: B28
        - Loan Repayments: B29
        - Others Fixed Expenses: B30
        - One-time Repairs / Maintenance: B33
        - Deep Cleaning / Pest Control: B34
        - Equipment Rentals / Lease: B35
        - Miscellaneous OpEx: B36

        User message: ${message}"

        If the message is not a valid update command, return null.
        Return ONLY the JSON object or null. Do not include any other text or comments.
        `;
        const result = await model.generateContent(prompt);
        const response = result.response.text().trim();
        if (response === 'null' || response === null){
            return null;
        }
        const parsed = JSON.parse(response);
        return parsed;
    } catch (error) {
        console.error('Error parsing command:', error);
        return null;
    }
}