const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;

export const getMarginData = async () => {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:F44?key=${API_KEY}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data from Google Sheets');
        }
        const data = await response.json();
        return transformSheetData(data.values);

    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        return [];
    }
};

