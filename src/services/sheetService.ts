const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;

type SheetRow = {
    id: number;
    category: string;
    amount: number;
    percentage: string;
    change: string;
};

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

const transformSheetData = (rawData: unknown[][]): SheetRow[] => {
    if (!rawData || rawData.length < 2) return [];
    
    return rawData.slice(1).map((row: unknown[], index: number) => ({
      id: index,
      category: String(row[0] || ''),
      amount: row[1] ? parseFloat(String(row[1]).replace(/[,$]/g, '')) : 0,
      percentage: String(row[2] || ''),
      change: String(row[3] || '')
    })).filter((row) => row.category);
  };

export const updateSheet = async (cell: string, value: number) => {
    try {
        console.log(`Updating cell ${cell} with value: ${value}`);

        const response = await fetch('/api/update-sheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cell, value }),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Apps Script response:', result);
        
        if (result.success) {
            return {
                success: true,
                message: `Successfully updated ${cell} to $${value.toLocaleString()}`
            };
        } else {
            throw new Error(result.error || 'Unknown error from Apps Script');
        }
        
    } catch (error) {
        console.error('Error updating sheet:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Update failed'
        };
    }
};
