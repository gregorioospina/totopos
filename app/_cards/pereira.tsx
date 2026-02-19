interface IPereira {}

const Pereira = (props: IPereira) => {
	return (
		<div className="flex flex-col  gap-y-4 px-6 py-10">
			<div>
				<p className="h1">Lugar</p>
				<p className="h3 highlight">Bienvenidos a Pereira, corazón del Eje Cafetero</p>
			</div>
			<p className="body">
				Pereira es la capital de Risaralda y el corazón del Eje Cafetero colombiano, una región reconocida por sus paisajes montañosos, su cultura cafetera y la
				calidez de su gente. Es una ciudad vibrante, rodeada de naturaleza exuberante, donde conviven el ritmo moderno y el encanto rural.
			</p>
			<p className="body">
				Con un clima templado todo el año y acceso a termales, cafetales y pueblos coloridos como Salento y Filandia, Pereira es el punto perfecto para
				disfrutar lo mejor del interior de Colombia: buena comida, hospitalidad y una taza del mejor café del mundo.
			</p>
		</div>
	);
};
export default Pereira;
