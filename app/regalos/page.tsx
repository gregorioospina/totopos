import Regalos from "@/_cards/regalos";
import TCard from "@/_components/card";

export default function Home() {
	return (
		<div className="z-10 relative py-20 flex justify-center">
			<TCard noImage>
				<Regalos />
			</TCard>
		</div>
	);
}
