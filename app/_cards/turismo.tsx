interface ITurismo {}

const Turismo = (props: ITurismo) => {
	return (
		<div className="flex flex-col gap-y-4 px-6 py-10">
			<div>
				<p className="h1">Turismo</p>
				<p className="h3">Actividades y lugares para visitar</p>
			</div>
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-col gap-y-1">
					<p className="font-bold">A. Naturaleza & fauna</p>
					<p className="body">
						<span className="font-semibold">Bioparque Ukumarí</span> – Parque de conservación a 20–25 min de Pereira. Horario 9:00–16:30. Perfecto para
						familias.
					</p>
				</div>
				<div className="flex flex-col gap-y-1">
					<p className="font-bold">B. Aguas termales</p>
					<p className="body">
						<span className="font-semibold">Termales Santa Rosa de Cabal</span> – Cascadas y piscinas termales a 40–60 min. Entradas por "pasaportes" con cupos
						por franjas; revisar horarios/promos vigentes antes de ir.
					</p>
				</div>
				<div className="flex flex-col gap-y-1">
					<p className="font-bold">C. Pueblos icónicos del café (day trips)</p>
					<p className="body">
						<span className="font-semibold">Filandia</span> – Mirador, artesanías, cafés de especialidad. Bus ~50 min desde Pereira (Expreso Alcalá).
					</p>
					<p className="body">
						<span className="font-semibold">Valle de Cocora & Salento</span> – Palmas de cera, senderismo; calcular 1 h–2 h según tráfico/ruta (transporte
						público vía Filandia).
					</p>
				</div>
				<div className="flex flex-col gap-y-1">
					<p className="font-bold">D. Café de origen (tours)</p>
					<p className="body">
						<span className="font-semibold">Hacienda Venecia</span> (cerca de Manizales) – Tour interactivo de café (se reserva). Traslado ~1 h–1 h30 desde
						Pereira.
					</p>
				</div>
				<div className="flex flex-col gap-y-1">
					<p className="font-bold">E. City walk en Pereira (2–3 h)</p>
					<p className="body">Plaza de Bolívar y Catedral, Viaducto César Gaviria (miradores), Boulevard de la 14 para cafés y helados.</p>
				</div>
			</div>
		</div>
	);
};
export default Turismo;
