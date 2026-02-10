import Image from "next/image";

interface ICard {}

const Card = (props: ICard) => {
	return (
		<div className="max-w-110 relative bg-background-2 aspect-10/16 shadow-lg rounded-md max-h-220">
			<div className="absolute bottom-0 h-60 left-0 right-0">
				<Image className="object-cover object-top" src={"/assets/FOTOLAGO.png"} fill alt="foto lago" />
			</div>
		</div>
	);
};
export default Card;
