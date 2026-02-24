interface IPereira {}

const Pereira = (props: IPereira) => {
	return (
		<div className="flex flex-col  gap-y-4 px-6 py-6 md:py-10">
			<div>
				<p className="h1">Lugar</p>
				<p className="h3 highlight">Bienvenidos a Pereira, corazón del Eje Cafetero</p>
			</div>
			<p className="body-small">
				Pereira es la capital de Risaralda y el corazón del Eje Cafetero colombiano, una región reconocida por sus paisajes montañosos, su cultura cafetera y la
				calidez de su gente. Es una ciudad vibrante, rodeada de naturaleza exuberante, donde conviven el ritmo moderno y el encanto rural.
			</p>
			<p className="body-small">
				Con un clima templado todo el año y acceso a termales, cafetales y pueblos coloridos como Salento y Filandia, Pereira es el punto perfecto para
				disfrutar lo mejor del interior de Colombia: buena comida, hospitalidad y una taza del mejor café del mundo.
			</p>
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
export default Pereira;
