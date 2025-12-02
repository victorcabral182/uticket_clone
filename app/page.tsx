import banner from '@/public/img/banner.webp';
import { SearchFilterBar } from './global-components/SearchFilterBar/SearchFilterBar';
import { fetchEvents } from './services/fetchEventsHome';
import EventCard from './global-components/EventCard/EventCard';

export default async function Home(props: {
  searchParams: Promise<{
    q: string;
  }>;
}) {
  const { q } = await props.searchParams;
  const data = await fetchEvents({ q });

  return (
    <section>
      <div className="relative max-h-[510px] h-[510px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${banner.src})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        />

        <div className="absolute inset-0 bg-black/5" />

        <div className="relative h-full max-w-7xl mx-auto flex items-center">
          <h2 className="text-[40px] md:text-[54px] lg:text-[74px] text-white text-shadow-lg font-black leading-tight px-4">
            Seu <br /> Evento <br /> Começa aqui
          </h2>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-50 max-w-7xl w-full px-8">
          <SearchFilterBar />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20 max-w-7xl mx-auto px-4">
        {data?.items?.length ? (
          data.items.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })
        ) : (
          <p className="col-span-full text-center text-xl text-gray-600 p-8">
            {q
              ? `Nenhum evento encontrado para "${q}".`
              : 'Nenhum evento disponível no momento.'}
          </p>
        )}
      </div>
    </section>
  );
}
