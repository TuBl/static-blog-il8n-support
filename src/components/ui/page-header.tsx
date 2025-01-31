import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
}

export function PageHeader({ title, subtitle, heroImage }: PageHeaderProps) {
  return (
    <div className="relative">
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={title}
            width={500}
            height={250}
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>
      )}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
