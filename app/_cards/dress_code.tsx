import Image from "next/image";

interface IDressCode {}

const DressCode = (props: IDressCode) => {
	return (
		<div className="flex flex-col">
			<p className="h1">Dress code</p>
			<p className="h3">El evento será formal</p>
			<p className="body">
				El evento será al aire libre y el terreno es irregular, por lo que recomendamos a las mujeres usar zapatos de plataforma o tacón ancho para mayor
				comodidad.
			</p>
			<div className="p-4 flex flex-col gap-8">
				<div className="relative z-10 flex items-center justify-center h-auto">
					<Image src={"/assets/men.png"} width={400} height={300} className="w-4/5 h-auto object-contain" alt="men dress code" />
				</div>
				<div className="relative z-10 flex items-center justify-center h-auto">
					<Image src={"/assets/women.png"} width={400} height={300} className="w-4/5 h-auto object-contain" alt="women dress code" />
				</div>
			</div>
		</div>
	);
};
export default DressCode;
