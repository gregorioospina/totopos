interface ISleepingArrangements {}

const SleepingArrangements = (props: ISleepingArrangements) => {
	return (
		<div className="flex flex-col gap-y-4 px-6 py-10">
			<div>
				<p className="h1">Hospedaje</p>
				<p className="h3 highlight">Opciones de alojamiento cerca de la celebración</p>
			</div>
			<p className="body">
				Les recomendamos hospedarse en la zona de <span className="font-bold">Cerritos</span>, para estar cerca de la{" "}
				<span className="font-bold">Hacienda San Jorge.</span>
			</p>
			<div className="flex flex-col gap-y-3">
				<div className="flex flex-col gap-y-1">
					<div className="flex justify-between">
						<p className="h3 font-bold">Airbnbs</p>
						<a
							className=""
							target="__blank"
							href="https://docs.google.com/spreadsheets/d/1f0n3pyHC3UUW6qA5im0WR-iMmeSkHzEi/edit?usp=sharing&ouid=113762363215732489077&rtpof=true&sd=true">
							Ver lista de Airbnbs
						</a>
					</div>
					<p className="body">Hemos preparado una lista de Airbnbs, especialmente buena para grupos grandes.</p>
				</div>
				<div className="flex flex-col gap-y-1">
					{" "}
					<div className="flex justify-between">
						<p className="font-bold">Hotel Sonesta</p>{" "}
						<a className="" target="__blank" href="https://www.sonestapereira.com/">
							Ir a hotel Sonesta
						</a>
					</div>
					<p className="body">Se encuentra cruzando la calle del lugar del matrimonio.</p>
					<div className="bg-foreground-light/10 p-2 rounded">
						<p className="text-sm font-semibold">CÓDIGO DE DESCUENTO: BODAMARIAYDIEGO</p>
					</div>
				</div>
				<div className="flex flex-col gap-y-1">
					<div className="flex justify-between">
						<p className="font-bold">Apartamentos Cerritos Mall</p>
						<a className="" target="__blank" href="https://drive.google.com/file/d/1OogqANWktX2cz6gdQm50X1B4EdgAXanL/view?usp=sharing">
							Ver apartamentos
						</a>
					</div>
					<p className="body">Para quienes prefieren un espacio más independiente, ideales para 1 a 4 personas, con la comodidad de contar con cocina.</p>
				</div>
			</div>
		</div>
	);
};
export default SleepingArrangements;
