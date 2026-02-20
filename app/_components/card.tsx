import Image from "next/image";

interface ITCard {
	image?: string;
	noImage?: boolean;
	children?: React.ReactNode;
	imageClassName?: string;
}

const TCard = ({ image = "/assets/FOTOLAGO.png", children, noImage, imageClassName }: ITCard) => {
	return (
		<div className="md:max-w-110 w-[90svw] relative bg-background-2 h-[87svh] md:h-[80svh] md:aspect-8/16 shadow-[0pt_4pt_10px_-7px_#0000007a] rounded-md max-h-[90%]">
			{!noImage && <div className="z-20 relative rounded-[inherit] bg-[linear-gradient(180deg,_#f4f2e2e6_95%,_transparent)]">{children}</div>}
			{noImage && children}
			{!noImage && (
				<div className="absolute bottom-0 h-60 left-0 right-0">
					<Image className={[imageClassName ? imageClassName : "object-cover object-top", "rounded-b-md "].join(" ")} src={image} fill alt="foto lago" />
				</div>
			)}
		</div>
	);
};
export default TCard;
