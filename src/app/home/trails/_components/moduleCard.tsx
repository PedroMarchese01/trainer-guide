import Image from "next/image";
import Link from "next/link";

interface ModuleCardProps {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  completed?: boolean;
}

export default function ModuleCard({
  slug,
  title,
  subtitle,
  image,
}: ModuleCardProps) {
  return (
    <Link href={`/home/trails/${slug}`}>
      <div className="bg-zinc-900 rounded-xl overflow-hidden w-full max-w-sm shadow-lg border border-zinc-800 hover:scale-[1.02] transition hover:cursor-pointer">
        <div className="relative w-full h-40">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-zinc-50">{title}</h2>
          <p className="text-zinc-400 text-sm">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
