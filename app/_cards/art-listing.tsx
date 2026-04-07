"use client";

import { Dialog } from "@/_components/dialog";
import Loader from "@/_components/loader";
import Snackbar from "@/_components/snackbar";
import { ArtPiece } from "@/_interfaces";
import { artists } from "@/art-listing/constants/artists";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AMOUNT_OPTIONS = [200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000];

const ProgressBar = ({ percentage }: { percentage: number }) => {
	const display = Math.min(percentage, 100);
	return (
		<div className="flex flex-col gap-y-1 mt-2">
			<div className="w-full bg-foreground/20 rounded-full h-1.5">
				<div className="bg-highlight h-1.5 rounded-full transition-all duration-500" style={{ width: `${display}%` }} />
			</div>
			<p className="body-small text-foreground-light">{percentage.toFixed(0)}% comprometido</p>
		</div>
	);
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex justify-between gap-x-4 items-baseline border-b border-foreground/10 py-1.5">
		<p className="body-small text-foreground-light shrink-0">{label}</p>
		<p className="body-small text-foreground text-right">{value}</p>
	</div>
);

const ArtListing = () => {
	const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);
	const [dialogPhase, setDialogPhase] = useState<"info" | "commit">("info");
	const [commitName, setCommitName] = useState("");
	const [commitPhone, setCommitPhone] = useState("");
	const [commitAmount, setCommitAmount] = useState(200000);
	const [submitting, setSubmitting] = useState(false);
	const [snackbar, setSnackbar] = useState({ open: false, message: "" });

	const fetchArt = () => {
		setLoading(true);
		fetch("/api/fetch-art")
			.then((r) => r.json())
			.then((data) => {
				if (!data.art) {
					console.error("No art in response:", data);
					return;
				}
				const pieces: ArtPiece[] = data.art
					.filter((row: string[]) => row.length > 0 && row[0])
					.map((row: string[], i: number) => {
						return {
							id: row[0] ?? "",
							img: row[1] ?? "",
							name: row[2] ?? "",
							specs: row[3] ?? "",
							artistId: row[4] ?? "",
							price: Number(row[5] ?? 0),
							percentageCommited: Number(row[6] ?? 0),
							index: i,
						};
					});
				setArtPieces(pieces);
			})
			.catch((e) => console.error("Error fetching art:", e))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchArt();
	}, []);

	const handleOpenPiece = (piece: ArtPiece) => {
		setSelectedPiece(piece);
		setDialogPhase("info");
		setCommitName("");
		setCommitPhone("");
		setCommitAmount(100);
	};

	const handleCommit = async () => {
		if (!selectedPiece || !commitName.trim() || !commitPhone.trim()) return;
		setSubmitting(true);
		try {
			const newPct = selectedPiece.percentageCommited + (commitAmount / selectedPiece.price) * 100;
			const response = await fetch("/api/upsert-art-commitment", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					index: selectedPiece.index,
					percentageCommited: newPct,
					name: commitName,
					phone: commitPhone,
					artPieceName: selectedPiece.name,
					amount: commitAmount,
					artPieceId: selectedPiece.id,
				}),
			});

			if (response.ok) {
				setSelectedPiece(null);
				setSnackbar({ open: true, message: "¡Tu aporte quedó guardado! Pronto nos pondremos en contacto contigo." });
				setTimeout(fetchArt, 500);
			} else {
				window.alert("Error al guardar tu aporte. Intenta de nuevo.");
			}
		} catch (e) {
			console.error("Error committing:", e);
			window.alert("Error al guardar tu aporte. Intenta de nuevo.");
		} finally {
			setSubmitting(false);
		}
	};

	const renderArtPieceCard = (piece: ArtPiece) => (
		<button
			key={piece.id}
			onClick={() => handleOpenPiece(piece)}
			className="border border-foreground/30 rounded-md p-4 cursor-pointer hover:bg-background-2 transition-colors text-left w-full flex flex-col">
			{piece.img && (
				<div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
					<Image src={piece.img} fill className="object-cover" alt={piece.name} />
				</div>
			)}
			<p className="h3">{piece.name}</p>
			<p className="body-small text-foreground-light mt-1">${piece.price.toLocaleString("en-US")} COP</p>
			{/* <p className="body-small text-foreground-light mt-2 line-clamp-2">
				{piece.description.substring(0, 100)}
				{piece.description.length > 100 ? "…" : ""}
			</p> */}
			<ProgressBar percentage={piece.percentageCommited} />
		</button>
	);

	const renderInfoFooter = () => {
		if (!selectedPiece) return null;
		if (selectedPiece.percentageCommited > 100) {
			return (
				<button disabled className="w-full border border-foreground/20 text-foreground/40 rounded-md px-4 py-2 text-sm cursor-not-allowed">
					Obra comprometida
				</button>
			);
		}
		return (
			<button
				className="w-full bg-highlight text-white rounded-md px-4 py-2 text-sm hover:bg-highlight-dark transition-colors"
				onClick={() => setDialogPhase("commit")}>
				Comprometer
			</button>
		);
	};

	const renderCommitFooter = () => (
		<button
			className="w-full bg-highlight text-white rounded-md px-4 py-2 text-sm hover:bg-highlight-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			onClick={handleCommit}
			disabled={submitting || !commitName.trim() || !commitPhone.trim()}>
			{submitting ? "Guardando..." : "Confirmar aporte"}
		</button>
	);

	const artist = selectedPiece ? artists.find((a) => a.id === selectedPiece.artistId) : null;

	return (
		<>
			<Loader fullscreen open={loading} />

			<div className="px-6 py-4 pt-20 md:py-10 md:pt-25 max-w-4xl mx-auto">
				<div className="mb-7 -ml-3">
					<Link href={"/regalos"} className="mb-10 bg-transparent underline text-sm">
						volver a regalos
					</Link>
				</div>
				<p className="h1 mb-2">Obras de Arte</p>
				<p className="body text-foreground-light mb-10">
					Una selección de piezas que nos encantaría llevar con nosotros a donde vayamos. Si quieres aportar a la adquisición de una obra, haz clic sobre ella.
				</p>

				{artPieces.length === 0 && !loading && (
					<div className="flex justify-center items-center py-16">
						<p className="body text-foreground-light">Pronto publicaremos las obras disponibles.</p>
					</div>
				)}

				{artists.map((artist) => {
					const pieces = artPieces.filter((p) => p.artistId === artist.id);
					if (pieces.length === 0) return null;
					return (
						<section key={artist.id} className="mb-16">
							{/* Artist hero */}
							<div className="flex gap-x-5 items-start mb-8">
								<div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 bg-foreground/10">
									<Image src={artist.img} fill className="object-cover" alt={artist.name} />
								</div>
								<div className="flex flex-col justify-center">
									<p className="h1">{artist.name}</p>
									<p className="body text-foreground-light mt-1">{artist.bio}</p>
								</div>
							</div>

							{/* Art pieces grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{pieces.map(renderArtPieceCard)}</div>
						</section>
					);
				})}
			</div>

			{/* Art piece dialog */}
			<Dialog
				open={!!selectedPiece}
				onClose={() => setSelectedPiece(null)}
				containerClassName="bg-white"
				noDivider
				footer={dialogPhase === "info" ? renderInfoFooter() : renderCommitFooter()}>
				{selectedPiece && dialogPhase === "info" && (
					<div className="flex flex-col gap-y-4">
						{selectedPiece.img && (
							<div className="relative w-full h-56 rounded-md overflow-hidden">
								<Image src={selectedPiece.img} fill className="object-cover" alt={selectedPiece.name} />
							</div>
						)}
						<div>
							<p className="h1">{selectedPiece.name}</p>
							{artist && <p className="body-small text-foreground-light">{artist.name}</p>}
						</div>
						<div className="flex flex-col border border-foreground/15 rounded-md overflow-hidden px-3 py-1">
							<InfoRow label="Artista" value={artist?.name ?? "—"} />
							<InfoRow label="Técnica" value={selectedPiece.specs} />
							<InfoRow label="Precio" value={`$${selectedPiece.price.toLocaleString("en-US")} COP`} />
							<InfoRow label="Comprometido" value={`${selectedPiece.percentageCommited.toFixed(0)}%`} />
						</div>
						<ProgressBar percentage={selectedPiece.percentageCommited} />
						{/* <p className="body text-foreground-light">{selectedPiece.description}</p> */}
					</div>
				)}

				{selectedPiece && dialogPhase === "commit" && (
					<div className="flex flex-col gap-y-4">
						<div>
							<p className="h2">¿Quieres aportar a esta obra?</p>
							<p className="body-small text-foreground-light mt-2">
								Cuéntanos cuánto quieres aportar, guardaremos tu solicitud y próntamente una persona de nuestro equipo se va a poner en contacto contigo para
								resolver el pago.
							</p>
							<p className="body-small text-highlight mt-1">Tu aporte quedará guardado.</p>
						</div>
						<div className="flex flex-col gap-y-1">
							<label className="body-small text-foreground">Tu nombre</label>
							<input
								type="text"
								className="border border-foreground-light rounded-md p-2 body focus:outline-none focus:border-foreground"
								value={commitName}
								onChange={(e) => setCommitName(e.target.value)}
								placeholder="Tu nombre..."
							/>
						</div>
						<div className="flex flex-col gap-y-1">
							<label className="body-small text-foreground">Teléfono / WhatsApp</label>
							<input
								type="tel"
								className="border border-foreground-light rounded-md p-2 body focus:outline-none focus:border-foreground"
								value={commitPhone}
								onChange={(e) => setCommitPhone(e.target.value)}
								placeholder="+57 300 000 0000"
							/>
						</div>
						<div className="flex flex-col gap-y-1">
							<label className="body-small text-foreground">Monto a aportar (COP)</label>
							<select
								className="border border-foreground-light rounded-md p-2 body focus:outline-none focus:border-foreground bg-background"
								value={commitAmount}
								onChange={(e) => setCommitAmount(Number(e.target.value))}>
								{AMOUNT_OPTIONS.map((amt) => (
									<option key={amt} value={amt}>
										${amt.toLocaleString("en-US")} COP
									</option>
								))}
							</select>
						</div>
					</div>
				)}
			</Dialog>

			<Snackbar open={snackbar.open} message={snackbar.message} onClose={() => setSnackbar({ open: false, message: "" })} />
		</>
	);
};

export default ArtListing;
