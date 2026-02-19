interface IContactos {}

const Contactos = (props: IContactos) => {
	return (
		<div className="flex flex-col gap-y-4 px-6 py-10">
			<div>
				<p className="h1">Contactos</p>
				<p className="h3">Servicios útiles durante tu estadía</p>
			</div>
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-col gap-y-2">
					<p className="font-bold">Transporte local</p>
					<div className="flex flex-col gap-y-1">
						<p className="body">
							<span className="font-semibold">Taxi oficial:</span> Afuera de llegadas en el aeropuerto, pago en efectivo. Para salir del hotel, pedir servicio
							de taxi de confianza en recepción.
						</p>
						<p className="body">
							<span className="font-semibold">Traslados privados / prepagados:</span> Servicios como AtoB o All-Ways permiten reservar sedán/van con precio
							cerrado. Útil para llegadas nocturnas o grupos.
						</p>
						<p className="body">
							<span className="font-semibold">Apps:</span> Uber, DiDi, inDrive.
						</p>
						<p className="body">
							<span className="font-semibold">Alquiler de carro:</span> Práctico si harán varios day trips.
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-y-2">
					<p className="font-bold">Peluquería y Maquillaje</p>
					<div className="flex flex-col gap-y-2">
						<div>
							<p className="body font-semibold">María Paz Makeup</p>
							<a href="tel:+573215155676" className="body text-foreground hover:underline">
								+57 321 515 5676
							</a>
						</div>
						<div>
							<p className="body font-semibold">María Teresa Echavarría</p>
							<a href="tel:+573104942078" className="body text-foreground hover:underline">
								+57 310 494 2078
							</a>
						</div>
						<div>
							<p className="body font-semibold">Carolina</p>
							<a href="tel:+573113042612" className="body text-foreground hover:underline">
								+57 311 304 2612
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Contactos;
