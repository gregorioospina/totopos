import Image from "next/image";

interface IRegalos {}

const Regalos = (props: IRegalos) => {
	return (
		<div className="flex flex-col gap-y-4 px-6 py-10">
			<div>
				<p className="h1">Regalos</p>
				<p className="h3 highlight">Prontamente les contaremos cómo pueden darnos un regalito</p>
			</div>
			<Image src={"/assets/them/sombrero.jpg"} width={500} height={350} className="w-4/3 rounded-md h-auto object-contain" alt="regalos" />
		</div>
	);
};
export default Regalos;
