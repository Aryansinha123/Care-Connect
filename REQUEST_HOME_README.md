# Request Home Feature - Implementation Guide

## Overview
This feature allows home admins to create donation requests with UPI payment information, and enables donors to easily donate via QR code scanning or UPI app.

## Environment Variables

Add to your `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
UPLOAD_STORAGE_PATH=/mnt/data/uploads  # Optional: defaults to /mnt/data/uploads (Linux) or ./public/uploads (Windows)
```

## File Structure

```
models/
  ├── Request.js          # Request model with UPI fields
  └── Home.js            # Home model (existing)

app/
  ├── api/
  │   ├── requests/
  │   │   ├── route.js                    # POST/GET /api/requests
  │   │   └── [id]/
  │   │       ├── route.js                # GET /api/requests/[id]
  │   │       └── upload-qr/
  │   │           └── route.js            # POST /api/requests/[id]/upload-qr
  │   └── homes/
  │       └── [id]/
  │           └── upi-info/
  │               └── route.js            # GET /api/homes/[id]/upi-info
  ├── request-home/
  │   └── page.jsx                       # Admin form to create request
  ├── homes/
  │   └── [id]/
  │       └── page.jsx                    # Updated with Donate button
  └── components/
      └── DonateModal.jsx                 # Donation modal component
```

## Setup Instructions

1. **Install Dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Create Upload Directory**:
   - **Linux/Mac**: Create `/mnt/data/uploads` directory (or set `UPLOAD_STORAGE_PATH` env var)
   - **Windows**: The code automatically uses `./public/uploads` directory

   ```bash
   # Linux/Mac
   sudo mkdir -p /mnt/data/uploads
   sudo chmod 755 /mnt/data/uploads

   # Windows (automatic, or create manually)
   mkdir public\uploads
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

## API Endpoints

### 1. Create Request
- **POST** `/api/requests`
- **Auth**: Admin required (add middleware)
- **Body**:
  ```json
  {
    "name": "Home Name",
    "description": "Request description",
    "upi": {
      "vpa": "home@paytm"
    },
    "contactEmail": "contact@example.com",
    "contactPhone": "+91 1234567890",
    "homeId": "optional-home-id"
  }
  ```

### 2. Upload QR Image
- **POST** `/api/requests/[id]/upload-qr`
- **Auth**: Admin required
- **Body**: `FormData` with `qrImage` file
- **File Types**: PNG, JPG, SVG
- **Max Size**: 2MB

### 3. Get Request
- **GET** `/api/requests/[id]`
- **Auth**: Public

### 4. Get Home UPI Info
- **GET** `/api/homes/[id]/upi-info`
- **Auth**: Public
- **Returns**: Latest request UPI info or home UPI info

## Serving Uploaded Files

The uploaded files are served via `/api/files/[filename]` route (already exists in your codebase). 

**Alternative**: To serve files as static assets in Next.js:

1. Store files in `public/uploads/` directory
2. Files will be accessible at `/uploads/filename.png`
3. Update `qrImageUrl` in database to use `/uploads/filename.png`

## Testing Checklist

### 1. Create Request
- [ ] Navigate to `/request-home`
- [ ] Fill in form: name, description, UPI VPA
- [ ] Optionally upload QR image (PNG/JPG/SVG, max 2MB)
- [ ] Submit form
- [ ] Verify success message appears
- [ ] Check database for created request

### 2. Upload QR Image
- [ ] Create a request first
- [ ] Use the request ID to upload QR image via API or form
- [ ] Verify file is saved to `/mnt/data/uploads` (or `public/uploads` on Windows)
- [ ] Verify `qrImageUrl` is updated in database

### 3. View Home Page
- [ ] Navigate to `/homes/[id]` where `id` is the home ID
- [ ] Verify "Donate" button is visible in sidebar
- [ ] Click "Donate" button
- [ ] Verify donation modal opens

### 4. Test Donation Modal
- [ ] Verify QR code image displays (if uploaded)
- [ ] Verify UPI ID is displayed
- [ ] Test "Copy" button for UPI ID
- [ ] Enter amount in input field
- [ ] Click "Open UPI App" button
- [ ] Verify UPI app opens (on mobile) or URL is generated correctly
- [ ] Test fallback instructions if QR is missing

### 5. Mobile Testing
- [ ] Test on mobile device
- [ ] Scan QR code with UPI app
- [ ] Verify amount is pre-filled correctly
- [ ] Test "Open UPI App" button functionality

## Security Notes

- **Admin Authentication**: Add authentication middleware to admin routes (`/api/requests` POST, `/api/requests/[id]/upload-qr`)
- **File Validation**: File type and size validation is implemented (PNG/JPG/SVG, max 2MB)
- **No Sensitive Data**: Do NOT store PIN/CVV or any sensitive payment data
- **UPI Validation**: Basic UPI VPA format validation is implemented

## Troubleshooting

1. **QR Image Not Loading**:
   - Check file path in database
   - Verify file exists in upload directory
   - Check file serving route (`/api/files/[filename]`)
   - Verify file permissions

2. **UPI App Not Opening**:
   - Test on mobile device (desktop browsers may not support `upi://` protocol)
   - Verify UPI VPA format is correct
   - Check browser console for errors

3. **File Upload Fails**:
   - Check directory permissions
   - Verify `UPLOAD_STORAGE_PATH` env var is set correctly
   - Check file size (must be < 2MB)
   - Verify file type (PNG, JPG, or SVG)

## Next Steps

1. Add authentication middleware to admin routes
2. Add request status management (pending, approved, rejected)
3. Add email notifications on request creation
4. Add analytics for donation tracking
5. Implement request editing/deletion for admins



