interface IPanorama {}

const Panorama = (props: IPanorama) => {
	return (
		<div className="flex flex-col gap-y-4 px-6 py-10">
			<div>
				<p className="h1">Panorama de la zona</p>
				<p className="h3 highlight">Información útil para tu visita</p>
			</div>
			<div className="flex flex-col gap-y-3">
				<div className="flex flex-col gap-y-1">
					<p className="font-bold">Ciudad y aeropuerto</p>
					<p className="body-small">
						Pereira es la puerta de entrada al Eje Cafetero; llegan por el <span className="font-semibold">Aeropuerto Internacional Matecaña (PEI)</span>, a 15
						min de Cerritos.
					</p>
					<p className="body-small">
						Taxis oficiales en llegadas y disponibilidad de Uber; trayecto suele estar entre <span className="font-semibold">COP $30.000–$40.000</span>.
					</p>
				</div>
				<div className="flex flex-col gap-y-1">
					<p className="font-bold">Clima</p>
					<p className="body-small">
						Cálido-templado y húmedo todo el año; <span className="font-semibold">24–27 °C de día / 17–19 °C de noche</span> aprox., con lluvias frecuentes.
					</p>
				</div>
			</div>
		</div>
	);
};
export default Panorama;
