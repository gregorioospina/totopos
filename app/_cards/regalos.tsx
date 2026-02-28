"use client";

import { Dialog } from "@/_components/dialog";
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());

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
				setIsModalOpen(false);
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

	return (
		<>
			<div className="px-6 py-6 pt-20 md:py-10 md:pt-20">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 auto-rows-fr">
					{/* Mobile: Combined header cell spanning both columns */}
					<div className="col-span-2 md:hidden rounded-md gap-y-2 flex flex-col">
						<div>
							<p className="h1">Regalos</p>
							<p className="h3 highlight">Prontamente les contaremos cómo pueden darnos un regalito</p>
						</div>
						<div className="flex items-center h-20 justify-center">
							<button className="bg-highlight text-white rounded-md px-4 py-2 hover:bg-highlight-dark transition-colors" onClick={() => setIsModalOpen(true)}>
								¡Déjanos un mensaje!
							</button>
						</div>
					</div>
					<div className="col-span-2 md:hidden flex flex-col justify-between">
						<div className="flex justify-center h-40 w-full relative">
							<Image src="https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/sombrero.jpg" fill className="rounded-md object-cover" alt="regalos" />
						</div>
					</div>

					{/* Desktop: First message in column 1 */}
					{!loading && messages.length > 0 && renderMessageCard(messages[0], "hidden md:block")}

					{/* Desktop: Combined header cell spanning columns 2-4 */}
					<div className="hidden md:block md:col-span-3 rounded-md p-6 ">
						<div className="flex justify-between gap-x-2">
							<div className="flex flex-col">
								<p className="h1">Regalos</p>
								<p className="h3 highlight">Prontamente les contaremos cómo pueden darnos un regalito</p>
								<div className="flex-1"></div>
								<button
									className="bg-highlight w-50 text-white rounded-md px-4 py-2 hover:bg-highlight-dark transition-colors"
									onClick={() => setIsModalOpen(true)}>
									¡Déjanos un mensaje!
								</button>
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
						messages.slice(1).map((msg) => renderMessageCard(msg))
					)}
				</div>
			</div>
			<Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Déjanos un mensaje">
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
		</>
	);
};
export default Regalos;
