import Image from "next/image";
import Link from "next/link";

interface ICardSubcategoryProps {
  img: string;
  name: string;
  slug: string;
  resolveParams: string;
}

export const CardSubcategory = ({
  img,
  name,
  slug,
  resolveParams,
}: ICardSubcategoryProps) => {
  return (
    <Link
      href={`/${resolveParams}/${slug}`}
      className="flex flex-col justify-center items-center"
    >
      <div className="rounded-full w-24 h-24 overflow-hidden  border-2 border-sky-500 hover:scale-105 transition-all duration-200">
        <Image
          src={img}
          alt={name}
          className="w-full h-full object-cover"
          width={96}
          height={96}
        />
      </div>
      <span className="font-semibold text-green-600">{name}</span>
    </Link>
  );
};
