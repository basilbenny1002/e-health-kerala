import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  if (!location) {
    return NextResponse.json({ error: 'Location is required' }, { status: 400 });
  }

  const query = `hospitals in ${location}`;
  const apiKey = 'AIzaSyDYF1Z6Ehgxy88Aj9wRQLX_Ywly4UavdTc'; // API Key provided by user
  
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`
    );
    const data = await res.json();

    if (data.status === 'OK') {
      return NextResponse.json({ results: data.results });
    } else {
      return NextResponse.json({ error: data.error_message || 'Failed to fetch places' }, { status: 500 });
    }
  } catch (error) {
    console.error('Places API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
