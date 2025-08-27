# Finz Internship Assignment

Uses React application with TypeScript and Tailwind CSS that implements Google authentication, displays a Weekly Margin Report from Google Sheets, and includes an AI-powered chat interface for updating financial metrics using natural language commands.

##  Features

- **Google Authentication**: Secure login using Firebase Auth
- **Interactive Financial Dashboard**: Real-time Google Sheets integration
- **AI Chat Interface**: Natural language commands to update financial metrics

##  Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- Firebase project with Google Sign-In enabled
- Google Cloud Platform project with Sheets API enabled
- Google Gemini AI API key
- Google Apps Script deployment for sheet write operations

### 1. Clone and Install

```bash
git clone <repository-url>
cd finz-assignment/finz-assignment
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc123

# Google Sheets Configuration
VITE_GOOGLE_SHEET_ID=your_google_sheet_id
VITE_GOOGLE_SHEET_API_KEY=your_google_sheets_api_key

# AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key

# Apps Script URL for write operations
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### 3. Google Apps Script Setup

Create a Google Apps Script with the following code to handle sheet updates:

```javascript
function doGet(e) {
  try {
    const cell = e.parameter.cell;
    const value = parseFloat(e.parameter.value);
    
    if (!cell || isNaN(value)) {
      throw new Error('Invalid parameters');
    }
    
    const SHEET_ID = 'your_sheet_id_here';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    sheet.getRange(cell).setValue(value);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: `Successfully updated ${cell} to ${value}`,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

Deploy as a web app with:
- Execute as: Me
- Who has access: Anyone

### 4. Google Sheet Configuration

- Share your Google Sheet with the email associated with your Google Apps Script
- Grant "Editor" permissions to the Apps Script service account
- Set general access to "Viewer" to prevent direct editing

### 5. Firebase Setup

1. Enable Google Sign-In in Firebase Authentication
2. Add your domain to authorized domains
3. Configure OAuth consent screen in Google Cloud Console

### 6. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.


### Approach

**UI Founation**
- Started with Figma screenshots to recreate the login page
- Made draft implementations to extract exact colors and spacing
- Due to time constraints, focused on close approximation rather than perfect pixel matching

**Layout Architecture**
- Built margin page using component-based structure


**Google Sheets Integration**
- Created service account with API keys
- Shared Weekly Margin sheet with service account email

**Authentication**
- Implemented Google OAuth with Firebase Auth
- Integrated auth state management with React Router protection

**AI Integration**
- Used `gemini-2.5-flash-lite` for lower latency 


##  Assumptions

1. **User Authentication**: All users have Google accounts for authentication
2. **Sheet Structure**: Fixed cell positions for financial metrics (Column B for amounts)
3. **Network Connectivity**: Stable internet connection for real-time updates
4. **Browser Compatibility**: Modern browsers with ES6+ support
5. **Permissions**: Users have appropriate access to Google services
6. **Data Format**: Numeric values for financial metrics


### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Authentication**: Firebase Auth
- **Data**: Google Sheets API, Google Apps Script
- **AI**: Google Gemini AI
- **Routing**: React Router DOM
- **Deployment**: Vercel 
