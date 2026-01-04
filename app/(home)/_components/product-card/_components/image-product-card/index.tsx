"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IImageProductCardProps {
  src: string;
  alt: string;
  categorySlug: string;
  subcategorySlug: string;
  produtcSlug: string;
}

export const ImageProductCard = ({
  src,
  alt,
  categorySlug,
  subcategorySlug,
  produtcSlug,
}: IImageProductCardProps) => {
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <Link
      href={`/${categorySlug}/${subcategorySlug}/${produtcSlug}`}
      className="relative"
    >
      {/* Loader centralizado */}
      {loadingImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin text-green-600" size={24} />
        </div>
      )}

      <Image
        className="max-h-70 w-full rounded-lg"
        src={src}
        width={70}
        height={70}
        alt={alt}
        onLoad={() => setLoadingImage(false)}
      />
    </Link>
  );
};
