import Image from "next/image";

interface ITCard {
	image?: string;
	children?: React.ReactNode;
}

const TCard = ({ image = "/assets/FOTOLAGO.png", children }: ITCard) => {
	return (
		<div className="max-w-110 relative bg-background-2 aspect-8/16 shadow-lg rounded-md max-h-220">
			{children}
			<div className="absolute bottom-0 h-60 left-0 right-0">
				<Image className="object-cover object-top" src={image} fill alt="foto lago" />
			</div>
		</div>
	);
};
export default TCard;
