import { ReactNode } from "react";

interface IGrid {
	cards: Array<ReactNode>;
}

const Grid = ({ cards }: IGrid) => {
	return (
		<div className="px-[5%] flex flex-col items-center">
			{/* Mobile: Single column with snap scroll and 60px overflow preview */}
			<div className="md:hidden w-full h-screen overflow-y-scroll snap-y snap-mandatory pb-15">
				<div className="flex flex-col gap-4">
					{cards.map((card, index) => (
						<div key={index} className="snap-start shrink-0 xs:pt-10 pt-15">
							{card}
						</div>
					))}
				</div>
			</div>

			{/* Desktop: Two columns with offset and snap scroll */}
			<div className="hidden md:w-full md:flex justify-center h-screen overflow-y-scroll snap-y snap-mandatory">
				<div className="w-1/2 max-w-120 flex last-of-type::pb-10 flex-col gap-60 px-4">
					{cards
						.filter((_, index) => index % 2 === 0)
						.map((card, index) => (
							<div key={index * 2} className="snap-start shrink-0 pt-30 pb-10">
								{card}
							</div>
						))}
				</div>
				<div className="w-1/2 max-w-120 flex last-of-type:pb-10 pb-10 flex-col gap-60 px-4 mt-[30svh]">
					{cards
						.filter((_, index) => index % 2 === 1)
						.map((card, index) => (
							<div key={index * 2 + 1} className="snap-start shrink-0 pt-30 pb-10">
								{card}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
export default Grid;
