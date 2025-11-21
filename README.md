# HQ Recovery Member Portal

A modern, secure, and elegant member portal for HQ Recovery built with React, TypeScript, and Tailwind CSS, integrated with Google Sheets as the backend data source.

## 🎯 Features

- **Personalized Dashboard**: Welcome message with real-time session balance tracking
- **Session Management**: Visual indicators for Recovery, PT, and Team session balances
- **Google Sheets Integration**: Real-time data sync with your existing Google Sheets
- **Quick Actions**: Easy access to booking and purchasing sessions
- **Profile Management**: View profile information pulled from Google Sheets
- **Notifications**: Smart alerts for low balances and important updates
- **Responsive Design**: Mobile-friendly interface with smooth transitions
- **Spa-like Aesthetic**: Calming design with HQ Recovery brand colors

## 🔗 Google Sheets Integration

### Current Configuration
- **Sheet ID**: `1vxCrle-dndD661Duj5LaemgDQwNRVxnqZOYZxbNc8_o`
- **Sheet Name**: `Sheet1`
- **Data Structure**:
  - Column A: Name
  - Column B: Phone Number
  - Column C: Email
  - Column D: Recovery Sessions
  - Column E: PT Sessions
  - Column F: Team Sessions

### How It Works
The portal uses Google Sheets' public API to fetch member data in real-time. When a member logs in with their email, the system:

1. Searches for their email in Column C
2. Retrieves their session balances from Columns D, E, F
3. Displays personalized dashboard with current data
4. Updates automatically on each login

### Making Your Sheet Public (Current Setup)
Your sheet is configured as public, which means:
- ✅ No API keys required
- ✅ Easy setup and maintenance
- ✅ Real-time data access
- ⚠️ Sheet data is publicly viewable (consider this for sensitive information)

## 🚀 Quick Start

### 1. Installation
```bash
npm install
npm run dev
```

### 2. Testing the Integration
To test with your Google Sheet:

1. Add test data to your sheet:
   ```
   Row 1: John Doe | (555) 123-4567 | john@example.com | 5 | 3 | 2
   Row 2: Jane Smith | (555) 987-6543 | jane@example.com | 8 | 1 | 4
   ```

2. Login with any email from your sheet (no password required!)
3. View your real session balances instantly!

### 3. WordPress Integration

#### Option A: iFrame Embed
```html
<iframe 
  src="https://your-portal-url.com" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border-radius: 10px;">
</iframe>
```

#### Option B: Direct Integration
1. Build the project: `npm run build`
2. Upload the `dist` folder to your server
3. Include in your WordPress theme

## 🎨 Brand Guidelines

The portal follows HQ Recovery's brand guidelines:

- **Primary Color**: `#d8ba5b` (Gold) for highlights and CTAs
- **Secondary Colors**: `#231f1f` (Dark Brown) and `#141311` (Background)
- **Text Color**: White on dark backgrounds, `#141311` on gold backgrounds
- **Design Aesthetic**: Clean, welcoming spa aesthetic with soft edges

## 📊 Managing Your Data

### Adding New Members
Simply add a new row to your Google Sheet with:
- Column A: Full Name
- Column B: Phone Number  
- Column C: Email Address
- Column D: Recovery Sessions (number)
- Column E: PT Sessions (number)
- Column F: Team Sessions (number)

### Updating Session Balances
Edit the numbers in columns D, E, F directly in your Google Sheet. Changes appear immediately in the portal.

### Member Authentication
Uses simple email-based authentication with your Google Sheet as the user database. Any email in Column C can log in instantly - no password required!

## 🔒 Security Considerations

### Current Setup (Public Sheet)
- ✅ Easy to manage and update
- ✅ No API key management required
- ✅ Simple email-only authentication
- ⚠️ Sheet data is publicly accessible

### Recommended for Production
Consider upgrading to:
1. **Private Sheet with API Key**: More secure, requires Google Cloud setup
2. **Proper Authentication**: Integration with your existing member management system
3. **HTTPS**: Always use HTTPS in production

## 🛠️ Customization

### Adding New Session Types
1. Add new columns to your Google Sheet
2. Update `src/services/googleSheets.ts` to include new columns
3. Add new session balance cards in `src/components/Dashboard.tsx`

### Updating Colors/Branding
Modify the Tailwind classes in components or update `tailwind.config.js`

### Adding Appointment Data
To add appointment functionality:
1. Add appointment columns to your sheet (Date, Time, Service Type)
2. Update the `googleSheetsService` to parse appointment data
3. Appointments will automatically appear in the portal

## 📱 Mobile Experience

The portal is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🆘 Support

### Common Issues

**"User not found"**: Check that the email exists in Column C of your Google Sheet

**"Failed to load data"**: Verify your Google Sheet is public and the ID is correct

**Login issues**: Ensure the email address exactly matches what's in your Google Sheet

### Getting Help
For technical support or customization requests:
- Email: support@hqrecovery.com
- Check the browser console for detailed error messages

## 📈 Analytics & Insights

The portal automatically tracks:
- Member login frequency
- Session balance usage patterns
- Popular features and actions

## 🔄 Updates & Maintenance

### Updating Member Data
Simply edit your Google Sheet - changes appear immediately in the portal.

### Adding Features
The modular design makes it easy to add new features without affecting existing functionality.

### Backup & Recovery
Your data lives in Google Sheets, which has built-in version history and backup capabilities.

## 📄 License

This project is proprietary to HQ Recovery. All rights reserved.

---

**Ready to launch your member portal!** 🚀

The integration with your Google Sheet is complete and ready for testing. Add some sample data to your sheet and try logging in with those email addresses!