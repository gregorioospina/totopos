"use client";

import { Dialog } from "@/_components/dialog";
import Loader from "@/_components/loader";
import { GiftMessage } from "@/_interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IRegalos {}

const Regalos = (props: IRegalos) => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<GiftMessage[]>([]);
	const [maxMessageIndex, setMaxMessageIndex] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState("");
	const [author, setAuthor] = useState("");
	const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
	const [isBankModalOpen, setIsBankModalOpen] = useState(false);
	const [isArtModalOpen, setIsArtModalOpen] = useState(false);
	const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());

	const fetchMessages = () => {
		setLoading(true);
		fetch("/api/fetch-messages")
			.then((s) => s.json())
			.then((c) => {
				if (!c.messages) {
					console.error("No messages in response:", c);
					window.alert("Error al cargar los comentarios.");
					return;
				}

				let maxIndex = 0;
				const messages = c.messages
					.filter((f: any) => f.length != 0)
					.map((a: string[]) => {
						maxIndex = Math.max(maxIndex, Number(a[0]));
						return {
							author: a[1],
							message: a[2],
							likes: Number(a[3] ?? "0"),
							index: Number(a[0]),
						};
					});
				console.log("Fetched Messages:", messages, maxIndex);
				setMaxMessageIndex(maxIndex);
				setMessages(messages);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		// Load liked messages from localStorage
		const liked = new Set<string>();
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key?.startsWith("liked-")) {
				liked.add(key);
			}
		}
		setLikedMessages(liked);

		fetchMessages();
	}, []);

	const handleSubmitMessage = async () => {
		if (!message.trim() || !author.trim()) {
			window.alert("Por favor completa ambos campos.");
			return;
		}

		setSubmitting(true);
		try {
			console.log("Submitting message:", { message, author, index: maxMessageIndex });
			const response = await fetch("/api/add-message", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message, author, index: maxMessageIndex }),
			});

			if (response.ok) {
				setMessage("");
				setAuthor("");
				setIsMessageModalOpen(false);
				setTimeout(fetchMessages, 1000);
			} else {
				window.alert("Error al enviar el mensaje. Intenta de nuevo.");
			}
		} catch (error) {
			console.error("Error submitting message:", error);
			window.alert("Error al enviar el mensaje. Intenta de nuevo.");
		} finally {
			setSubmitting(false);
		}
	};

	const handleLikeMessage = async (msg: GiftMessage) => {
		const likeKey = `liked-${msg.author}-${msg.message.substring(0, 25)}`;

		// Check if already liked
		if (likedMessages.has(likeKey)) {
			return;
		}

		try {
			const response = await fetch("/api/like-message", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ index: msg.index - 1, likes: msg.likes }),
			});

			if (response.ok) {
				// Update localStorage
				localStorage.setItem(likeKey, "true");
				setLikedMessages(new Set([...likedMessages, likeKey]));

				// Update local state
				setMessages(messages.map((m) => (m.index === msg.index ? { ...m, likes: m.likes + 1 } : m)));
			}
		} catch (error) {
			console.error("Error liking message:", error);
		}
	};

	const renderMessageCard = (msg: GiftMessage, className?: string) => {
		const likeKey = `liked-${msg.author}-${msg.message.substring(0, 25)}`;
		const isLiked = likedMessages.has(likeKey);

		return (
			<div key={msg.index} className={["border border-foreground/30 rounded-md p-4 flex flex-col justify-between", className ?? ""].join(" ")}>
				<p className="body-small line-clamp-6">{msg.message}</p>
				<div className="flex items-center justify-between mt-2">
					<button
						onClick={() => handleLikeMessage(msg)}
						disabled={isLiked}
						className="flex items-center gap-1 transition-opacity disabled:cursor-not-allowed"
						title={isLiked ? "Ya le diste like a este mensaje" : "Me gusta"}>
						<Image
							src={isLiked ? "/assets/filled-love.svg" : "/assets/love.svg"}
							width={20}
							height={20}
							alt="like"
							className={isLiked ? "opacity-100" : "opacity-50 hover:opacity-100 transition-opacity"}
						/>
						{msg.likes > 0 && <span className="body-small text-foreground-light">{msg.likes}</span>}
					</button>
					<p className="body-small text-foreground-light">— {msg.author}</p>
				</div>
			</div>
		);
	};

	const ButtonRow = () => (
		<div className="flex flex-wrap gap-2">
			<button
				className="border border-foreground/40 text-foreground rounded-md px-4 py-2 text-sm hover:bg-foreground/10 transition-colors"
				onClick={() => setIsBankModalOpen(true)}>
				Info bancaria
			</button>
			<button
				className="border border-foreground/40 text-foreground rounded-md px-4 py-2 text-sm hover:bg-foreground/10 transition-colors"
				onClick={() => setIsArtModalOpen(true)}>
				Obras de arte
			</button>
		</div>
	);

	return (
		<>
			<Loader fullscreen open={loading} />

			<div className="px-6 py-4 pt-20 md:py-10 md:pt-25">
				<p className="h1 md:hidden">Regalos</p>
				{/* Mobile: Combined header cell spanning both columns */}
				<div className="col-span-2 md:hidden rounded-md gap-y-2 flex flex-col">
					<div>
						<p className="h3 text-sm mt-1">
							Como muchos saben, todavía no tenemos certeza de dónde vamos a vivir a partir de septiembre. Si quieren acompañarnos con un regalo, pueden
							ayudarnos a construir nuestro futuro hogar con alguna de estas dos opciones:
						</p>
					</div>
					<ButtonRow />
				</div>
				<div className="col-span-2 md:hidden h-50 flex flex-col justify-between my-4">
					<div className="flex justify-center h-full w-full relative">
						<Image src="https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/sombrero.jpg" fill className="rounded-md object-cover" alt="regalos" />
					</div>
				</div>
				<div className="col-span-2 md:hidden mb-6 flex flex-col justify-between">
					<div className="flex flex-wrap gap-2">
						<p className="h3 text-sm highlight mt-1">Además, nos encantaría que nos regalen una anécdota, historia o consejo de su primer hogar!</p>
						<button
							className="bg-highlight text-white rounded-md px-4 py-2 text-sm hover:bg-highlight-dark transition-colors"
							onClick={() => setIsMessageModalOpen(true)}>
							¡Déjanos un mensaje!
						</button>
					</div>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 auto-rows-fr">
					{/* Desktop: First message in column 1 */}
					{!loading && messages.length > 0 && renderMessageCard(messages[0], "hidden md:flex")}

					{/* Desktop: Combined header cell spanning columns 2-4 */}
					<div className="hidden md:block md:col-span-3 rounded-md p-3 mt-1 ">
						<div className="flex justify-between gap-x-2">
							<div className="flex flex-col">
								<p className="h1">Regalos</p>
								<p className="h3 text-sm mt-1">
									Como muchos saben, todavía no tenemos certeza de dónde vamos a vivir a partir de septiembre. Si quieren acompañarnos con un regalo, pueden
									ayudarnos a construir nuestro futuro hogar con alguna de estas dos opciones:
								</p>
								<div className="flex-1 mt-3"></div>
								<ButtonRow />
								<div className="flex flex-wrap gap-2 mt-3">
									<p className="h3 text-sm highlight mt-1">Además, nos encantaría que nos regalen una anécdota, historia o consejo de su primer hogar!</p>
									<button
										className="bg-highlight text-white rounded-md px-4 py-2 text-sm hover:bg-highlight-dark transition-colors"
										onClick={() => setIsMessageModalOpen(true)}>
										¡Déjanos un mensaje!
									</button>
								</div>
							</div>
							<div className="flex justify-center">
								<Image
									src="https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/sombrero.jpg"
									width={300}
									height={225}
									className="rounded-md object-cover"
									alt="regalos"
								/>
							</div>
						</div>
					</div>

					{/* Messages */}
					{loading ? (
						<div className="col-span-2 md:col-span-5 flex justify-center items-center py-8">
							<p className="body text-foreground-light">Cargando mensajes...</p>
						</div>
					) : messages.length === 0 ? (
						<div className="col-span-2 md:col-span-5 flex justify-center items-center py-8">
							<p className="body text-foreground-light">No hay mensajes aún. ¡Sé el primero!</p>
						</div>
					) : (
						<>
							{messages.map((msg, index) => {
								// On desktop, skip first message (it's rendered separately above)
								// On mobile, show all messages
								if (index === 0) {
									return renderMessageCard(msg, "md:hidden");
								}
								return renderMessageCard(msg);
							})}
						</>
					)}
				</div>
			</div>

			{/* Message modal */}
			<Dialog open={isMessageModalOpen} onClose={() => setIsMessageModalOpen(false)} title="Déjanos un mensaje">
				<div className="flex flex-col gap-y-4">
					<p className="body-small">Escríbenos un mensajito de amor. Aparecerá en la página</p>
					<div className="flex flex-col gap-y-1">
						<label className="body-small text-foreground">Tu mensaje</label>
						<textarea
							className="border border-foreground-light rounded-md p-2 body focus:outline-none focus:border-foreground min-h-[100px]"
							value={message}
							maxLength={150}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Escribe tu mensaje aquí..."
						/>
						<p className="text-xs text-foreground/40">{message.length}/150</p>
					</div>
					<div className="flex flex-col gap-y-1">
						<label className="body-small text-foreground">Tu nombre</label>
						<input
							type="text"
							className="border border-foreground-light rounded-md p-2 body focus:outline-none focus:border-foreground"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							placeholder="Tu nombre..."
						/>
					</div>
					<button
						className="bg-foreground text-white rounded-md px-4 py-2 hover:bg-foreground-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={handleSubmitMessage}
						disabled={submitting || !author || !message}>
						{submitting ? "Enviando..." : "Enviar mensaje"}
					</button>
				</div>
			</Dialog>

			{/* Bank transfer modal */}
			<Dialog open={isBankModalOpen} onClose={() => setIsBankModalOpen(false)} title="Aporte en efectivo">
				<div className="flex flex-col gap-y-5 overflow-y-auto max-h-[70vh]">
					<p className="body-small text-foreground-light">Con un aporte que usaremos donde sea que la vida nos lleve.</p>

					{/* Colombia */}
					<div className="border border-foreground/20 rounded-lg p-4 flex flex-col gap-y-2">
						<p className="font-header text-base text-highlight font-semibold">Colombia — Nu CF</p>
						<div className="flex flex-col gap-y-1">
							<Row label="Titular" value="Diego Silva Silva" />
							<Row label="Banco" value="Nu CF" />
							<Row label="Tipo" value="Cuenta de ahorros" />
							<Row label="Número de cuenta" value="74184135" />
							<Row label="CC" value="1136888795" />
							<Row label="Llave" value="1136888795" />
						</div>
					</div>

					{/* USA */}
					<div className="border border-foreground/20 rounded-lg p-4 flex flex-col gap-y-2">
						<p className="font-header text-base text-highlight font-semibold">Estados Unidos</p>

						<div className="flex flex-col gap-y-1 pb-3 border-b border-foreground/10">
							<p className="body-small font-semibold text-foreground">Zelle</p>
							<Row label="Correo" value="mc.monsalver@uniandes.edu.co" />
						</div>

						<div className="flex flex-col gap-y-1 pt-2">
							<p className="body-small font-semibold text-foreground">Bank of America</p>
							<Row label="Titular" value="Maria Camila Monsalve Rodriguez" />
							<Row label="Account number" value="325210421303" />
							<Row label="Routing number" value="121000358" />
						</div>
					</div>
				</div>
			</Dialog>

			{/* Art modal */}
			<Dialog open={isArtModalOpen} onClose={() => setIsArtModalOpen(false)} title="Obras de arte">
				<div className="flex flex-col gap-y-4">
					<p className="body-small">Hicimos una pequeña selección de obras de arte que nos encantaría llevar con nosotros a donde vayamos.</p>
					<div className="border border-foreground/20 rounded-lg p-4 bg-background-2">
						<p className="body-small text-foreground-light">Estamos en proceso de escoger las piezas. En una semana podrán ver la selección aquí.</p>
					</div>
				</div>
			</Dialog>
		</>
	);
};

const Row = ({ label, value }: { label: string; value: string }) => (
	<div className="flex justify-between gap-x-4 items-baseline">
		<p className="body-small text-foreground-light shrink-0">{label}</p>
		<p className="body-small text-foreground text-right">{value}</p>
	</div>
);

export default Regalos;
