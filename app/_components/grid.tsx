import { ReactNode } from "react";

interface IGrid {
	cards: Array<ReactNode>;
	heroe?: ReactNode;

	hide: boolean;
}

const Grid = ({ cards, heroe, hide }: IGrid) => {
	return (
		<div className={["flex transition-opacity flex-col duration-700 items-center"].join(" ")}>
			{/* Mobile: Single column with snap scroll and 60px overflow preview */}
			<div className="md:hidden w-full h-screen overflow-y-scroll snap-y snap-mandatory pb-15">
				<div className="flex flex-col gap-4 px-[5%]">
					{heroe ? <div className="flex w-full ml-[-5%] snap-start">{heroe}</div> : null}
					{cards.map((card, index) => (
						<div key={index} className={["snap-start  transition-opacity duration-700  shrink-0 xs:pt-10 pt-20", hide ? "opacity-0" : "opacity-100"].join(" ")}>
							{card}
						</div>
					))}
				</div>
			</div>
			{/* Desktop: Two columns with offset and snap scroll */}
			<div className="hidden md:flex md:flex-col md:w-full h-screen overflow-y-scroll snap-y snap-mandatory">
				{heroe ? <div className="flex w-full snap-start">{heroe}</div> : null}
				<div className="flex flex-1 gap-x-5 justify-center">
					<div className="w-1/2 max-w-120 flex last-of-type::pb-10 flex-col gap-20 px-4">
						{cards
							.filter((_, index) => index % 2 === 0)
							.map((card, index) => (
								<div
									key={index * 2}
									className={["snap-start  transition-opacity duration-700  shrink-0 pt-30 pb-10", hide ? "opacity-0" : "opacity-100"].join(" ")}>
									{card}
								</div>
							))}
					</div>
					<div className="w-1/2 max-w-120 flex last-of-type:pb-10 pb-10 flex-col gap-20 px-4">
						{cards
							.filter((_, index) => index % 2 === 1)
							.map((card, index) => (
								<div
									key={index * 2 + 1}
									className={["snap-start transition-opacity duration-700 shrink-0 pt-30 pb-10", hide ? "opacity-0" : "opacity-100"].join(" ")}>
									{card}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Grid;
