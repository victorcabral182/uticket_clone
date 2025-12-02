import { IEvent } from '../global-components/EventCard/types';

interface IEventSearchResponse {
  count: number;
  items: IEvent[];
}

async function fetchEvents(
  options: {
    limit?: number;
    skip?: number;
    revalidate?: number;
  } = {},
) {
  const { limit = 12, skip = 0, revalidate = 60 } = options;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/eventsearch?limit=${limit}&skip=${skip}`,
      {
        next: { revalidate },
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': 'Mozilla/5.0 (...) Chrome/142.0.0.0 Safari/537.36',
          Origin: 'https://uticket.com.br',
          Referer: 'https://uticket.com.br/',
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('Expected JSON but got:', contentType);
      throw new Error('Response is not JSON');
    }

    const data: IEventSearchResponse = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

export { fetchEvents };
