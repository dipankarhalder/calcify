import Image from "next/image";

const ImageDisplay = ({ path, width, height, alt }) => {
  return (
    <Image
      priority
      loader={() => {
        return `${path}?w=${width}&q=75`;
      }}
      layout="fixed"
      objectFit="cover"
      src={path}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default ImageDisplay;
