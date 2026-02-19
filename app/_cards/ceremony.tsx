interface ICeremony {}

const Ceremony = (props: ICeremony) => {
	return (
		<div className="flex flex-col gap-y-4 px-6 py-10">
			<div className="flex flex-col">
				<p className="h1">Ceremonia y celebración</p>
				<p className="h3 highlight">Nos encantaría que nos acompañen en este día tan especial</p>
			</div>
			<div className="flex flex-col">
				<p className="text-center h2 font-bold">Junio 2026</p>
				<div className="relative">
					{/* MATRIMONIO text absolutely centered */}
					<div className="absolute top-11 inset-0 flex items-center justify-center pointer-events-none z-10">
						<p className="text-3xl md:text-4xl font-light font-serif text-white uppercase tracking-wide">Matrimonio</p>
					</div>

					{/* Grid structure */}
					<div className="grid grid-cols-3 bg-foreground">
						{/* Header row - superior rectangle */}
						<div className="border border-white p-2 text-center text-white">viernes</div>
						<div className="border border-white p-2 text-center text-white">sábado</div>
						<div className="border border-white p-2 text-center text-white">domingo</div>

						{/* Number row - 3 squares */}
						<div className="border bg-foreground-light border-white p-1 text-center text-white text-2xl aspect-4/3 flex items-start justify-start">5</div>
						<div className="border border-white p-1 text-center text-white text-2xl aspect-4/3 flex items-start justify-start">6</div>
						<div className="border bg-foreground-light border-white p-1 text-center text-white text-2xl aspect-4/3 flex items-start justify-start">7</div>
					</div>
				</div>
				<div className=" grid grid-cols-2 gap-y-4 px-6 py-10">
					<div className="flex flex-col">
						<p className="h3 font-semibold">Lugar</p>
						<p>Hacienda San Jorge</p>
						<p>
							Cerritos, <span className="font-bold">Pereira</span>
						</p>
					</div>
					<div className="flex flex-col">
						<p className="h3 font-semibold">Horario</p>
						<p>4:00 p.m. - Ceremonia</p>
						<p>5:30 p.m. - Coctel</p>
						<p>7:00 p.m. - Cena</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Ceremony;
