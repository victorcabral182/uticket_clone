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
    q?: string;
  } = {},
) {
  const { limit = 24, skip = 0, revalidate = 60, q } = options;

  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/eventsearch`);
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('skip', skip.toString());

    console.log(q);

    if (q) {
      url.searchParams.set('q', q);
      console.log(q);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate },
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (...) Chrome/142.0.0.0 Safari/537.36',
        Origin: 'https://uticket.com.br',
        Referer: 'https://uticket.com.br/',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
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
