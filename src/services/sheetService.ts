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

const transformSheetData = (rawData: any[]) => {
    if (!rawData || rawData.length < 2) return [];
    
    return rawData.slice(1).map((row: any[], index: number) => ({
      id: index,
      category: row[0] || '',
      amount: row[1] ? parseFloat(row[1].toString().replace(/[,$]/g, '')) : 0,
      percentage: row[2] || '',
      change: row[3] || ''
    })).filter((row: any) => row.category);
  };

export const updateSheet = async (cell: string, value: number) => {
    try {
        console.log(`Updating cell ${cell} with value: ${value}`);
        
        const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
        
        const url = `${APPS_SCRIPT_URL}?cell=${encodeURIComponent(cell)}&value=${encodeURIComponent(value)}`;
        
        const response = await fetch(url, {
            method: 'GET',
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

