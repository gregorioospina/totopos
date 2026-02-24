"use client";

import { Dialog } from "@/_components/dialog";
import { useEffect, useState } from "react";

type IFAQ = {
	index: number;
	askedby: string;
	question: string;
	answer?: string;
};

const FAQ = () => {
	const [loading, setLoading] = useState(false);
	const [faqs, setFaqs] = useState<IFAQ[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [question, setQuestion] = useState("");
	const [askedBy, setAskedBy] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [maxQuestionIndex, setMaxQuestionIndex] = useState(0);

	useEffect(() => {
		setLoading(true);
		fetch("/api/fetch-faqs")
			.then((s) => s.json())
			.then((c) => {
				if (!c.faqs) {
					console.error("No faqs in response:", c);
					window.alert("Error al cargar las preguntas.");
					return;
				}

				let maxIndex = 0;
				const faqs = c.faqs
					.filter((f: any) => f.length != 0)
					.map((a: string[]) => {
						maxIndex = Math.max(maxIndex, Number(a[0]));
						return {
							askedby: a[2],
							question: a[1],
							answer: a[3],
							index: Number(a[0]),
						};
					})
					.filter((f: IFAQ) => !!f.answer);
				console.log("Fetched FAQs:", faqs, maxIndex);
				setMaxQuestionIndex(maxIndex);
				setFaqs(faqs);
			})
			.finally(() => setLoading(false));
	}, []);

	const handleSubmitQuestion = async () => {
		if (!question.trim() || !askedBy.trim()) {
			window.alert("Por favor completa ambos campos.");
			return;
		}

		setSubmitting(true);
		try {
			console.log("Submitting question:", { question, askedBy, index: maxQuestionIndex });
			const response = await fetch("/api/add-faq", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ question, askedBy, index: maxQuestionIndex }),
			});

			if (response.ok) {
				setQuestion("");
				setAskedBy("");
				setIsModalOpen(false);
			} else {
				window.alert("Error al enviar la pregunta. Intenta de nuevo.");
			}
		} catch (error) {
			console.error("Error submitting question:", error);
			window.alert("Error al enviar la pregunta. Intenta de nuevo.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<>
			<div className="flex flex-col gap-y-4 px-6 py-10">
				<div className="flex justify-between">
					<p className="h1">Preguntas</p>
					<button className="bg-highlight text-white rounded-md px-3 py-1 hover:bg-highlight-dark transition-colors" onClick={() => setIsModalOpen(true)}>
						¡Haz tu pregunta!
					</button>
				</div>
				<div className="flex flex-col gap-y-6">
					{loading ? (
						<div className="flex justify-center items-center py-8">
							<p className="body text-foreground-light">Cargando preguntas...</p>
						</div>
					) : faqs.length === 0 ? (
						<div className="flex justify-center items-center py-8">
							<p className="body text-foreground-light">No hay preguntas disponibles.</p>
						</div>
					) : (
						faqs.map((faq) => (
							<div
								key={faq.index}
								className="flex flex-col gap-y-1 p-4 bg-background-2 rounded-lg border-l-4 border-highlight shadow-sm hover:shadow-md transition-shadow">
								<div className="flex gap-x-2 justify-between">
									<p className="h3 highlight font-semibold">{faq.question}</p>
									<p className="body-small">{faq.askedby}</p>
								</div>
								{faq.answer && <p className="body text-foreground-light">{faq.answer}</p>}
							</div>
						))
					)}
				</div>
			</div>
			<Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Haz tu pregunta">
				<div className="flex flex-col gap-y-4">
					<div className="flex flex-col gap-y-1">
						<label className="body-small text-foreground">Escribe tu pregunta</label>
						<textarea
							className="border border-foreground-light rounded-md p-2 body focus:outline-none focus:border-highlight min-h-[100px]"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							placeholder="Escribe tu pregunta aquí..."
						/>
					</div>
					<div className="flex flex-col gap-y-1">
						<label className="body-small text-foreground">Tu nombre</label>
						<input
							type="text"
							className="border border-foreground-light rounded-md p-2 body focus:outline-none focus:border-highlight"
							value={askedBy}
							onChange={(e) => setAskedBy(e.target.value)}
							placeholder="Tu nombre..."
						/>
					</div>
					<p className="body-small">Cuando Maca o Diego respondan tu pregunta, aparecerá en esta página. Vuelve en un rato para ver la respuesta!</p>
					<button
						className="bg-highlight text-white rounded-md px-4 py-2 hover:bg-highlight-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={handleSubmitQuestion}
						disabled={submitting || !askedBy}>
						{submitting ? "Enviando..." : "Enviar pregunta"}
					</button>
				</div>
			</Dialog>
		</>
	);
};
export default FAQ;
