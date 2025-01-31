import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

export function HeroSection({ title, subtitle, heroImage }: HeroSectionProps) {
  return (
    <div 
      className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl mb-8">{subtitle}</p>
        <Button asChild size="lg" className="bg-red-500 hover:bg-red-600">
          <Link href="/contacts">
            <Heart className="mr-2 h-5 w-5" />
            Help Now
          </Link>
        </Button>
      </div>
    </div>
  );
}