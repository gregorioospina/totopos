import Map from "@/_components/map";

interface IPereira {}

const Pereira = (props: IPereira) => {
	return (
		<div className="flex flex-col gap-y-1">
			<Map />
		</div>
	);
};
export default Pereira;
