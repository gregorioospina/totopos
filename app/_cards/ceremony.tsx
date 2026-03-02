interface ICeremony {}

const Ceremony = (props: ICeremony) => {
	return (
		<div className="flex flex-col gap-y-4 ">
			<div className="flex flex-col px-6 pt-6 md:pt-10">
				<p className="h1">Eventos</p>
			</div>
			<div className="flex flex-col">
				<p className="text-center h2 font-body font-bold">Junio 2026</p>
				<div className="relative">
					{/* MATRIMONIO text absolutely centered */}
					<div className="absolute top-11 inset-0 flex items-center justify-center pointer-events-none z-10">
						{/* <p className="text-3xl md:text-4xl font-light font-serif text-white uppercase tracking-wide">Matrimonio</p> */}
					</div>

					{/* Grid structure */}
					<div className="grid grid-cols-2 ">
						{/* Header row - superior rectangle */}
						<div className="border border-foreground font-black bg-foreground/70 p-2 text-center text-background">viernes</div>
						<div className="border border-foreground font-black bg-foreground/70 p-2 text-center text-background">sábado</div>

						{/* Number row - 3 squares */}
						<div className="border flex flex-col  border-foreground p-1 text-center text-foreground text-2xl aspect-6/3  items-start justify-start">
							<p className="text-xl font-bold">5</p>
							<p className="text-left text-base">Open house Sazagua</p>
						</div>
						<div className="border flex flex-col border-foreground p-1 text-center text-foreground text-2xl aspect-6/3  items-start justify-start">
							<p className="text-xl font-bold">6</p>
							<p className="text-left text-base">Matrimonio</p>
						</div>
					</div>
				</div>
			</div>
			<div className="px-6 pb-6 md:pb-10">
				<p className="h2 pt-2 text-highlight font-body leading-6 font-black">VIERNES</p>
				<div className=" grid grid-cols-2 gap-y-4 px-0 pb-9">
					<div className="flex flex-col">
						<p className="h3 font-semibold">Lugar</p>
						<p className="leading-5">Sazagua Hotel Boutique</p>
						<p className="leading-5 body-small font-black">Cerritos, Pereira</p>
						<p className="h3 font-semibold mt-3">Horario</p>
						<p className="leading-5">3:30pm a 9pm</p>
					</div>
					<div className="flex flex-col">
						<p className="h3 font-semibold">Descripción</p>
						<p className="leading-5">Open house para vernos antes del gran día</p>
						<p className="h3 font-semibold mt-3">Dress Code</p>
						<p className="leading-5">Casual bonitos</p>
					</div>
				</div>
				<p className="h2 w-full font-black font-body text-highlight leading-6">SABADO</p>
				<div className=" grid grid-cols-2 gap-y-4 px-0">
					<div className="flex flex-col">
						<p className="h3  font-semibold">Lugar</p>
						<p className="leading-5">Hacienda San Jorge</p>
						<p className="leading-5 body-small font-black">Cerritos, Pereira</p>
						<p className="h3 font-semibold mt-3">Dress Code</p>
						<button
							onClick={() => {
								const element = document.getElementById("dress-code-card");
								element?.scrollIntoView({ behavior: "smooth", block: "center" });
							}}
							className="text-sm font-body leading-5 mt-1 underline text-left hover:text-highlight transition-colors">
							Vestido Formal
						</button>
					</div>
					<div className="flex flex-col">
						<p className="h3  font-semibold mt-1">Horario</p>
						<p className="leading-5">4:00 p.m.</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Ceremony;
