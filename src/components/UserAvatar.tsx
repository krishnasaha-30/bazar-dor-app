import Image from "next/image";

type UserAvatarProps = {
  name: string;
  image?: string | null;
  size?: "small" | "large";
};

export default function UserAvatar({
  name,
  image,
  size = "small",
}: UserAvatarProps) {
  const sizeClass = size === "large" ? "size-14 text-xl" : "size-8 text-sm";

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 font-semibold text-green-800 ${sizeClass}`}
    >
      {image ? (
        <Image
          alt=""
          className="object-cover"
          fill
          sizes={size === "large" ? "56px" : "32px"}
          src={image}
          unoptimized
        />
      ) : (
        name.trim().charAt(0).toLocaleUpperCase()
      )}
    </span>
  );
}
