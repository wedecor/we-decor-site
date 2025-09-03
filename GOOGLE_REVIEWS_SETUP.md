# Google Reviews Integration Setup Guide

## Overview

This guide will help you integrate Google Reviews into your We Decor website. We've implemented two approaches:

1. **Google Places API Integration** (Recommended) - Fetches real reviews and displays them on your site
2. **Google Reviews Widget** - Simple embeddable widget

## Option 1: Google Places API Integration

### Step 1: Get Your Google Place ID

1. Go to [Google Maps](https://maps.google.com)
2. Search for your business "We Decor Bangalore"
3. Click on your business listing
4. In the URL, you'll see something like: `https://www.google.com/maps/place/We+Decor/@12.9716,77.5946,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae1234567890ab:0x1234567890abcdef!8m2!3d12.9716!4d77.5946`
5. The Place ID is the long string after `1s0x` and before `!8m2` (e.g., `3bae1234567890ab:0x1234567890abcdef`)

### Step 2: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Places API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click "Enable"

### Step 3: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key
4. **Important**: Restrict the API key:
   - Click on the API key
   - Under "Application restrictions" select "HTTP referrers"
   - Add your domain: `https://www.wedecorevents.com/*`
   - Under "API restrictions" select "Restrict key"
   - Select "Places API"

### Step 4: Add Environment Variables

Add these to your `.env.local` file:

```env
# Google Places API
GOOGLE_PLACES_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_PLACE_ID=your_place_id_here
```

For Vercel deployment, add these in your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add both variables

### Step 5: Test the Integration

1. Run your development server: `npm run dev`
2. Visit `/reviews` page
3. Check the browser console for any errors
4. The reviews should load automatically

## Option 2: Google Reviews Widget (Simpler)

### Step 1: Get Embed Code

1. Go to [Google My Business](https://business.google.com)
2. Select your business
3. Go to "Reviews" section
4. Click "Embed reviews"
5. Copy the embed code

### Step 2: Add to Your Site

You can add the embed code to any page or use our `GoogleReviewsWidget` component.

## Files Created/Modified

### New Files:

- `utils/googleReviews.ts` - API utility functions
- `pages/api/google-reviews.ts` - Server-side API route
- `components/GoogleReviewsWidget.tsx` - Widget component
- `pages/reviews.tsx` - Dedicated reviews page

### Modified Files:

- `components/Testimonials.tsx` - Now fetches Google Reviews

## Features Implemented

### ✅ What's Working:

- **Real Google Reviews**: Fetches actual reviews from Google Places API
- **Fallback System**: Shows static testimonials if API fails
- **Responsive Design**: Works on all devices
- **Loading States**: Shows spinner while loading
- **Error Handling**: Graceful error handling with fallback
- **Caching**: API responses cached for 1 hour
- **SEO Optimized**: Proper meta tags and structured data
- **Dark Mode Support**: Works with your existing dark mode

### 🎨 UI Features:

- **Profile Photos**: Shows reviewer profile pictures
- **Star Ratings**: Dynamic star display based on actual ratings
- **Review Dates**: Shows when reviews were posted
- **Google Badge**: Indicates reviews are from Google
- **Swiper Carousel**: Smooth sliding testimonials
- **Call-to-Action**: Links to Google Maps for more reviews

## Troubleshooting

### Common Issues:

1. **"API key not configured" error**
   - Check if `GOOGLE_PLACES_API_KEY` is set in environment variables
   - Verify the API key is correct and has Places API enabled

2. **"Failed to fetch reviews" error**
   - Check if your Place ID is correct
   - Verify your business has reviews on Google
   - Check API quotas in Google Cloud Console

3. **Reviews not showing**
   - Check browser console for errors
   - Verify the API route `/api/google-reviews` is working
   - Test with a known working Place ID

### Testing:

```bash
# Test API route directly
curl "http://localhost:3000/api/google-reviews?placeId=YOUR_PLACE_ID"
```

## Next Steps

1. **Get Your Place ID**: Follow Step 1 above to find your Google Place ID
2. **Set Up API Key**: Create and configure your Google Places API key
3. **Add Environment Variables**: Add the keys to your `.env.local` and Vercel
4. **Test**: Visit `/reviews` page to see the integration
5. **Customize**: Adjust styling and content as needed

## Cost Considerations

- **Google Places API**: Free tier includes 1,000 requests/day
- **Typical Usage**: ~10-50 requests/day for a business website
- **Cost**: Free for most small businesses

## Security Notes

- API key is stored server-side only
- Requests are proxied through your API route
- Rate limiting and caching implemented
- No sensitive data exposed to client

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify your Google Cloud Console settings
3. Test with the provided fallback system
4. Check browser console for detailed error messages

The integration is designed to be robust with fallbacks, so your site will always show testimonials even if Google Reviews fail to load.
