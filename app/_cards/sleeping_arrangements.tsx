interface ISleepingArrangements {}

const SleepingArrangements = (props: ISleepingArrangements) => {
	return (
		<div className="flex flex-col gap-y-1">
			<p className="h1">Hospedaje</p>
			<p>
				Les recomendamos hospedarse en la zona de <span className="font-bold">Cerritos</span>, para estar cerca de la{" "}
				<span className="font-bold">Hacienda San Jorge.</span>
			</p>
		</div>
	);
};
export default SleepingArrangements;
