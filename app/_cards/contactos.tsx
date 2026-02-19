interface IContactos {}

const Contactos = (props: IContactos) => {
	return (
		<div className="flex flex-col gap-y-4 px-6 py-10">
			<div>
				<p className="h1">Contactos</p>
				<p className="h3 highlight">Servicios útiles durante tu estadía</p>
			</div>
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-col gap-y-2">
					<p className="h3 font-bold leading-4">Transporte local</p>
					<div className="flex flex-col gap-y-1">
						<div>
							<p className="font-semibold">Taxi oficial</p>
							<p className="body-small">
								Afuera de llegadas en el aeropuerto, pago en efectivo. Para salir del hotel, pedir servicio de taxi de confianza en recepción.
							</p>
						</div>
						<div>
							<p className="font-semibold">Traslados privados / prepagados</p>
							<p className="body-small">
								Servicios como AtoB o All-Ways permiten reservar sedán/van con precio cerrado. Útil para llegadas nocturnas o grupos.
							</p>
						</div>
						<div>
							<p className="font-semibold">
								Apps <span className="font-light body-small">Uber, DiDi, inDrive.</span>
							</p>
						</div>
						<p className="body">
							<span className="font-semibold">Alquiler de carro:</span> <span className="body-small">Práctico si harán varios day trips.</span>
						</p>
					</div>
				</div>
				<div className="w-full border-b border-foreground/20" />
				<div className="flex flex-col gap-y-2">
					<div>
						<p className="font-bold h3">Peluquería y Maquillaje</p>
						<p className="body-small">Escríbele a cualquiera de estas espectaculares personas para que te arreglen para el grán día</p>
					</div>
					<div className="flex flex-col gap-y-2">
						<div>
							<p className="body font-semibold">María Paz Makeup</p>
							<a target="__blank" href="https://wa.me/+573215155676" className="">
								+57 321 515 5676
							</a>
						</div>
						<div>
							<p className="body font-semibold">María Teresa Echavarría</p>
							<a target="__blank" href="https://wa.me/+573104942078" className="">
								+57 310 494 2078
							</a>
						</div>
						<div>
							<p className="body font-semibold">Carolina</p>
							<a target="__blank" href="https://wa.me/+573113042612" className="">
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
