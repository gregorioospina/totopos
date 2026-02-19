import Image from "next/image";

interface ITCard {
	image?: string;
	noImage?: boolean;
	children?: React.ReactNode;
}

const TCard = ({ image = "/assets/FOTOLAGO.png", children, noImage }: ITCard) => {
	return (
		<div className="max-w-110 relative bg-background-2 aspect-8/16 shadow-[0pt_4pt_10px_-7px_#0000007a] rounded-md max-h-220">
			{children}
			{!noImage && (
				<div className="absolute bottom-0 h-60 left-0 right-0">
					<Image className="object-cover object-top" src={image} fill alt="foto lago" />
				</div>
			)}
		</div>
	);
};
export default TCard;
