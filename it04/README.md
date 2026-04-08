# IT04 Project - Angular Frontend + .NET Core 8 Backend

## 📁 Project Structure
```
IT04-Project/
├── backend/                    # .NET Core 8 Web API
│   ├── Controllers/
│   │   └── IT04Controller.cs
│   ├── Models/
│   │   └── IT04Model.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── Program.cs
│   └── IT04.Backend.csproj
└── frontend/                   # Angular 17 Frontend
    ├── src/
    │   └── app/
    │       ├── services/
    │       │   └── it04.service.ts
    │       ├── it04/
    │       │   ├── it04.component.ts
    │       │   ├── it04.component.html
    │       │   └── it04.component.scss
    │       ├── app.module.ts
    │       ├── app.component.ts
    │       ├── app.component.html
    │       ├── styles.scss
    │       └── main.ts
    │   └── index.html
    ├── package.json
    └── angular.json
```

## 🚀 How to Run

### Backend (.NET Core 8)
```bash
cd backend
dotnet run
```
- **URL**: http://localhost:5000
- **Swagger**: http://localhost:5000/swagger

### Frontend (Angular 17)
```bash
cd frontend
npm install
npm start
```
- **URL**: http://localhost:4200

## ✅ Requirements Implementation

### 1. Form Validation ✅
- **Email**: Format validation with regex pattern
- **Phone**: 10 digits validation
- **Birth Day**: DD/MM/YYYY format validation
- **All Fields**: Required validation implemented

### 2. Occupation Mockup Data ✅
- **10 predefined options** in dropdown:
  - Software Developer
  - Designer
  - Project Manager
  - Business Analyst
  - Data Scientist
  - Marketing Manager
  - Sales Representative
  - HR Manager
  - Accountant
  - Teacher

### 3. Profile Base64 ✅
- **File Upload**: Image selection with file input
- **Base64 Conversion**: FileReader converts to Base64
- **Preview**: Shows uploaded image preview

### 4. Save Functionality ✅
- **API Integration**: Sends data to backend
- **ID Generation**: Backend generates unique ID
- **Success Message**: Shows "save data success" with ID
- **Auto Clear**: Form clears after 3 seconds
- **Loading State**: Save button shows "Saving..." during API call

### 5. Clear Functionality ✅
- **Form Reset**: Clears all form fields
- **Image Clear**: Removes profile image
- **Message Clear**: Removes success message

## 🔧 Technical Details

### Backend API
- **Endpoint**: `POST /api/IT04/save`
- **Validation**: Server-side validation with detailed error messages
- **Response**: JSON with success status, message, and ID
- **CORS**: Configured for Angular frontend

### Frontend Features
- **2-Column Layout**: Responsive design for desktop/mobile
- **Real-time Validation**: Angular reactive forms
- **Error Messages**: Field-specific error display
- **Loading States**: Visual feedback during API calls
- **Modern UI**: Clean design with animations

## 📱 Responsive Design
- **Desktop**: 2-column layout
- **Mobile**: Single column layout
- **Tablet**: Adaptive layout based on screen size

## 🔗 API Integration

### Save Request
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "phone": "0123456789",
  "sex": "male",
  "birthDay": "15/01/1990",
  "occupation": "Software Developer",
  "profile": "data:image/jpeg;base64,..."
}
```

### Save Response
```json
{
  "success": true,
  "message": "save data success",
  "id": "ID1234567890"
}
```

### Error Response
```json
{
  "success": false,
  "errors": [
    {
      "field": "Email",
      "message": "Email format is invalid"
    }
  ]
}
```

## 🧪 Testing Instructions

1. **Start Backend**: `cd backend && dotnet run`
2. **Start Frontend**: `cd frontend && npm install && npm start`
3. **Open Browser**: Navigate to http://localhost:4200
4. **Test Validation**: 
   - Try submitting empty form (should show all required errors)
   - Try invalid email (should show email format error)
   - Try invalid phone (should show phone format error)
   - Try invalid date (should show date format error)
5. **Test Success**: Fill all fields correctly and submit
6. **Verify Integration**: Check browser console for API calls

## 📝 Notes

- **Dependencies**: Install npm packages before running frontend
- **CORS**: Backend configured for localhost:4200
- **Storage**: Backend uses in-memory storage (use database in production)
- **Security**: Add authentication/authorization for production use
- **Performance**: Consider adding loading spinners and error boundaries
