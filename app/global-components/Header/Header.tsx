import { HiMenu } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/next.svg';

export const Header = () => {
  return (
    <header className="flex items-center h-[60px] justify-between max-w-7xl mx-auto">
      <Link href="/" aria-label="Ir para página inicial">
        <Image
          src={logo}
          alt="Logo Uticket - Página Inicial"
          width={100}
          height={100}
        />
      </Link>

      <div className="flex items-center gap-4">
        <button className="bg-[#f2f2f2] text-[14px] text-[#444444] font-bold px-4 py-2 rounded-full">
          Criar Evento
        </button>

        <button
          className="hover:bg-[#f2f2f2] text-[14px] text-[#444444] font-bold p-2 rounded-full cursor-pointer transition-all duration-300"
          aria-label="Abrir menu de navegação"
        >
          <HiMenu size={22} className="text-[#444444]" />
        </button>
      </div>
    </header>
  );
};
