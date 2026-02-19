interface ITurismo {}

const Turismo = (props: ITurismo) => {
	return (
		<div className="flex flex-col gap-y-4 px-6 py-10">
			<div>
				<p className="h1">Turismo</p>
				<p className="h3 highlight">Actividades y lugares para visitar</p>
			</div>
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-col gap-y-0.5">
					<div className="items-end flex justify-between">
						<p className="body font-semibold">Bioparque Ukumarí</p>
						<a className="" target="__blank" href="https://ukumari.org/">
							Más información
						</a>
					</div>
					<p className="body-small">Parque de conservación a 20-25 min de Pereira. Horario 9:00-16:30. Perfecto para familias.</p>
				</div>
				<div className="flex flex-col gap-y-0.5">
					<div className="items-end flex justify-between">
						<p className="body font-semibold">Termales Santa Rosa de Cabal</p>
						<a
							className=""
							target="__blank"
							href="https://termales.com.co/?gad_source=1&gad_campaignid=20526467951&gbraid=0AAAAADPBLQ1bBg3CISRALp0Bh9OCvKPJ0&gclid=CjwKCAiAs4HMBhBJEiwACrfNZbVTY7JE9SzDTh1zhJDcb4VnJkePxYkWL7hnZNlpLp-AIQggr5Xn6BoCbk0QAvD_BwE">
							Más información
						</a>
					</div>
					<p className="body-small">
						Cascadas y piscinas termales a 40-60 min. Entradas por "pasaportes" concupos por franjas; revisar horarios/promos vigentes antes de ir.
					</p>
				</div>
				<div className="flex flex-col gap-y-0.5">
					<div className="items-end flex justify-between">
						<p className="body font-semibold">Hacienda Venecia</p>
						<a className="" target="__blank" href="https://haciendavenecia.com/">
							Más información
						</a>
					</div>
					<p className="body-small">(Cerca de Manizales) - Tour interactivo de café (se reserva). Traslado ~1 h-1 h30 desde Pereira.</p>
				</div>
				<div className="flex flex-col">
					<p className="font-semibold">Filandia</p>
					<p className="mb-2 body-small">Mirador, artesanías, cafés de especialidad. Bus ~50 min desde Pereira (Expreso Alcalá).</p>
					<p className="font-semibold">Valle de Cocora & Salento</p>
					<p className="mb-2 body-small">Palmas de cera, senderismo; calcular 1 h-2 h según tráfico/ruta (transporte público vía Filandia).</p>
					<p className="font-bold">City walk en Pereira (2-3 h) </p>
					<p className="body-small">Plaza de Bolívar y Catedral, Viaducto César Gaviria (miradores), Boulevard de la 14 para cafés y helados.</p>
				</div>
			</div>
		</div>
	);
};
export default Turismo;
