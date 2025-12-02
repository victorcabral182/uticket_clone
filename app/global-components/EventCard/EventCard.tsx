import Link from 'next/link';
import { IEvent } from './types';
import { formatCurrency } from '@/app/utils/formatters/formatCurrency';
import Image from 'next/image';

const EventCard = ({ event }: { event: IEvent }) => {
  const dateObject = new Date(event?.startDate);

  const formattedDate = dateObject.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const linkDescription = `Ver detalhes e comprar ingressos para o evento: ${event?.name}, que ocorrerá em ${formattedDate} no local ${event?.place}.`;

  return (
    <Link
      target="_blank"
      aria-label={linkDescription}
      href={`https://uticket.com.br/event/${event?.id}`}
    >
      <div className="relative w-full flex h-full flex-col rounded-lg overflow-hidden transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:-translate-y-1">
        <Image
          width={600}
          height={150}
          quality={100}
          alt={`Capa do evento: ${event?.name}`}
          className="w-full max-h-[150px] object-cover"
          src={`https://img.uticket.com.br/event/${event?.id}/s?uniqueId=1764693736755`}
          loading="lazy"
        />

        <div className="flex flex-col py-4 px-3">
          <h2 className="text-[18px] text-[#424242] font-bold">
            {event?.name}
          </h2>
          <p className="text-[#47b9ff] text-[14px] capitalize">
            {formattedDate}
          </p>
          <p className="text-[#b8b8b8] text-[14px]">{event?.place}</p>
        </div>

        <div className="absolute top-[110px] right-4 size-[54px] rounded-full overflow-hidden border-3 border-white antialiased">
          <Image
            src={event?.userImgUrl}
            alt={`Imagem do organizador do evento: ${event?.name}`}
            width={60}
            height={60}
          />
        </div>

        {(!!event?.minPrice || !!event?.maxPrice) && (
          <div
            className="absolute right-[5px] top-[5px] bg-white py-0.5 px-2 rounded-sm text-[13px] text-[#424242] font-bold"
            role="status"
            aria-label={`Faixa de preço do evento`}
          >
            <p>
              {event?.minPrice !== event?.maxPrice
                ? formatCurrency(event?.minPrice) +
                  ' - ' +
                  formatCurrency(event?.maxPrice)
                : formatCurrency(event?.maxPrice)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default EventCard;
