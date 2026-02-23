"use client";
import { Dialog } from "@/_components/dialog";
import Loader from "@/_components/loader";
import { useBreakpoint } from "@/_hooks/useGPTBreakpoint";
import { Invitation } from "@/_interfaces";
import { matchSorter } from "match-sorter";
import Head from "next/head";
import Link from "next/link";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

export default function RSVP() {
	const { isMd } = useBreakpoint();

	const [duplicateEmail, setDuplicateEmail] = useState<boolean>(false);
	const [incompleteEmail, setIncompleteEmail] = useState<boolean>(false);
	const [emptyName, setEmptyName] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const [attendees, setAttendees] = useState<Invitation[]>([]);
	const [invitationMap, setInvitationMap] = useState<Map<string, number>>(new Map());

	const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);

	const [successfulRSVP, setSuccessfulRSVP] = useState<boolean>(false);

	const [nameToSearch, setNameToSearch] = useState<string>("");
	const [preliminaryResults, setPreliminaryResults] = useState<string[]>([]);

	const [inputCC1, setInputCC1] = useState<string>("");
	const [inputCC2, setInputCC2] = useState<string>("");

	const [step, setStep] = useState<"SEARCH" | "SELECT" | "RSVP">("SEARCH");

	const hasError = useMemo(() => duplicateEmail || incompleteEmail || emptyName, [duplicateEmail, emptyName, incompleteEmail]);

	useEffect(() => {
		setLoading(true);
		fetch("/api/fetch-attendees")
			.then((s) => s.json())
			.then((c) => {
				if (!c.attendees) {
					console.error("No attendees in response:", c);
					window.alert("Error al cargar los invitados. Por favor, intenta de nuevo más tarde.");
					return;
				}

				const invitesMapped: Invitation[] = [];
				const setArray: [string, number][] = [];

				c.attendees.forEach((a: string[], index: number) => {
					const FullName1 = a[1] === "N/A" ? null : [a[1], a[2]].join(" ").trim();
					const FullName2 = a[4] === "N/A" ? null : [a[4], a[5]].join(" ").trim();

					if (FullName1) {
						// set.set(Name1, index);
						setArray.push([FullName1, index]);
					}

					if (FullName2) {
						// set.set(Name2, index);
						setArray.push([FullName2, index]);
					}

					invitesMapped.push({
						Name1: a[1] === "N/A" ? null : a[1],
						LastName1: a[2] === "N/A" ? null : a[2],
						Name2: a[4] === "N/A" ? null : a[4],
						LastName2: a[5] === "N/A" ? null : a[5],
						Confirm1: a[6] === "N/A" ? undefined : a[6] === "SI",
						Confirm2: a[7] === "N/A" ? undefined : a[7] === "SI",
						CC1: a[8] === "N/A" ? null : a[8],
						CC2: a[9] === "N/A" ? null : a[9],
						Restrictions1: a[10] === "N/A" ? null : a[10],
						Restrictions2: a[11] === "N/A" ? null : a[11],
						index,
					});
				});

				const sorted = setArray.sort((a, b) => (a[0] > b[0] ? 1 : -1));
				setInvitationMap(new Map(sorted));
				setAttendees(invitesMapped);
			})
			.finally(() => setLoading(false));
	}, []);

	const disableSendButton = useMemo(() => {
		if (!selectedInvitation) return true;

		const { Confirm1, Confirm2 } = selectedInvitation;

		if (Confirm1 === undefined && Confirm2 === undefined) {
			return true;
		}

		if ((Confirm1 && inputCC1.trim().length <= 5) || (Confirm2 && inputCC2.trim().length <= 5)) {
			return true;
		}

		return false;
	}, [inputCC1, inputCC2, selectedInvitation]);

	const handleUserSelect = useCallback(
		(index: number) => {
			setSelectedInvitation(attendees[index]);
			const cc1 = attendees[index].CC1;
			const cc2 = attendees[index].CC2;
			setInputCC1(cc1 ?? "");
			setInputCC2(cc2 ?? "");
		},
		[attendees],
	);

	const handleSend = useCallback(() => {
		if (!selectedInvitation) return;

		fetch("/api/add-rsvp", {
			method: "POST",
			body: JSON.stringify({ ...selectedInvitation, CC1: inputCC1, CC2: inputCC2 }),
		})
			.then((s) => s.json())
			.then((c) => {
				if (c.success) {
					setSuccessfulRSVP(true);
				}
			});
	}, [selectedInvitation, inputCC1, inputCC2]);

	const handleSearch = useCallback(() => {
		const results = matchSorter(Array.from(invitationMap.keys()), nameToSearch);
		if (results.length === 0) {
			window.alert("No hubo resultados para tu búsqueda, por favor intenta de nuevo");
			return;
		}
		setPreliminaryResults(results);
		setStep("SELECT");
	}, [invitationMap, nameToSearch]);

	const renderNameWithEllipsis = useCallback(
		(name: string) => {
			const length = isMd ? 35 : 23;
			if (name.length > length) {
				return name.slice(0, length - 3) + "...";
			}
			return name;
		},
		[isMd],
	);

	const renderContent = useMemo(() => {
		const length = () => {
			switch (step) {
				case "SEARCH":
					return "w-1/4";
				case "SELECT":
					return "w-1/2";
				case "RSVP":
					return "w-3/4";
			}
		};

		const title = () => {
			switch (step) {
				case "SEARCH":
					return "Busquemos tu invitación";
				case "SELECT":
					return "¡Vas muy bien!";
				case "RSVP":
					return "¡Ya casi!";
			}
		};
		return (
			<div className="w-full mb-10">
				<div className="w-full flex justify-between mb-1">
					<p className="text-xs md:text-sm uppercase font-extralight tracking-wider">{title()}</p>
					{step != "SEARCH" ? (
						<button
							onClick={() => {
								setSelectedInvitation(null);
								setStep("SEARCH");
								setNameToSearch("");
								setPreliminaryResults([]);
							}}
							className="bg-none text-sm font-light border-none underline">
							Volver a empezar
						</button>
					) : (
						<div></div>
					)}
				</div>
				<div className="w-full relative rounded-full h-2 bg-foreground/30">
					<div className={`${length()} rounded-full h-full bg-foreground transition-all`}></div>
				</div>
			</div>
		);
	}, [step]);

	const renderInputsOfSelectedInvitation = useMemo(() => {
		const inputs: ReactNode[] = [];
		if (!selectedInvitation) return null;

		const { Confirm1, Confirm2, Name1, Name2, LastName1, LastName2 } = selectedInvitation;

		if (Name1 && Name2) {
			inputs.push(<p className="uppercase mt-4 mb-1 font-extralight text-sm tracking-wide">Confirma la asistencia de tu grupo</p>);
		} else {
			inputs.push(<p className="uppercase mt-4 mb-1 font-extralight text-sm tracking-wide">Confirma tu asistencia</p>);
		}

		if (Name1) {
			inputs.push(
				<div className="flex justify-between gap-x-5 md:gap-x-20 items-center">
					<p className="text-base">{renderNameWithEllipsis([Name1, LastName1].join(" "))}</p>
					<div className="flex justify-end gap-x-2">
						<button
							onClick={() => setSelectedInvitation((i: any) => ({ ...(i as Invitation), Confirm1: true }))}
							className={`${
								Confirm1 === true ? "bg-foreground text-background" : ""
							} border-1 md:border-2 text-xs md:text-base hover:bg-foreground/75 hover:text-background transition-all hover:cursor-pointer border-foreground px-2 md:px-5 py-1`}>
							Si voy
						</button>
						<button
							onClick={() => setSelectedInvitation((i: any) => ({ ...(i as Invitation), Confirm1: false }))}
							className={`${
								Confirm1 === false ? "bg-foreground text-background" : ""
							} border-1 md:border-2 text-xs md:text-base hover:bg-foreground/75 hover:text-background transition-all hover:cursor-pointer border-foreground px-2 md:px-5 py-1`}>
							No voy
						</button>
					</div>
				</div>,
			);
		}
		if (Name2) {
			inputs.push(
				<div className="flex justify-between gap-x-5 md:gap-x-20 items-center">
					<p className="text-base">{renderNameWithEllipsis([Name2, LastName2].join(" "))}</p>
					<div className="flex justify-end gap-x-2">
						<button
							onClick={() => setSelectedInvitation((i: any) => ({ ...(i as Invitation), Confirm2: true }))}
							className={`${
								Confirm2 === true ? "bg-foreground text-background" : ""
							} border-1 md:border-2 text-xs md:text-base hover:bg-foreground/75 hover:text-background transition-all hover:cursor-pointer border-foreground px-2 md:px-5 py-1`}>
							Si voy
						</button>
						<button
							onClick={() => setSelectedInvitation((i: any) => ({ ...(i as Invitation), Confirm2: false }))}
							className={`${
								Confirm2 === false ? "bg-foreground text-background" : ""
							} border-1 md:border-2 text-xs md:text-base hover:bg-foreground/75 hover:text-background transition-all hover:cursor-pointer border-foreground px-2 md:px-5 py-1`}>
							No voy
						</button>
					</div>
				</div>,
			);
		}

		return inputs;
	}, [renderNameWithEllipsis, selectedInvitation]);

	const renderSteps = useMemo(() => {
		switch (step) {
			case "SEARCH":
				return (
					<div className="flex flex-col gap-y-4 justify-center">
						<div className="flex flex-col gap-y-0">
							<div className="w-full flex justify-center">
								<img src={"/assets/DTORTUGAM.png"} alt="searching" className="max-w-2/4 mb-2" />
							</div>
							<p className="font-body text-sm md:text-base font-light mb-4">
								Por favor, ingresa tu nombre y apellido a continuación. Si estás confirmando tu asistencia por ti y un acompañante (o tu familia), podrás
								responder por todo tu grupo en la siguiente página
							</p>
						</div>
						<input
							className="border border-foreground/30 rounded-md p-2"
							onChange={(e) => setNameToSearch(e.target.value ?? "")}
							placeholder="Escribe tu nombre"
						/>
						<button
							disabled={nameToSearch.length < 3}
							onClick={handleSearch}
							className="bg-foreground disabled:bg-foreground/35 px-4 py-4 w-fit rounded-md text-background mt-4 font-highlights">
							Busca tu invitación
						</button>
					</div>
				);
			case "SELECT":
				return (
					<div className="flex flex-col gap-y-4 justify-center">
						<div className="flex flex-col gap-y-0">
							<p className="font-highlights text-3xl md:text-4xl font-serif max-w-[60%]">¡Te encontramos!</p>
							<p className="font-body text-sm md:text-base font-light mb-4">
								Si aparece más de una opción, por favor selecciona tu grupo y haz clic en &apos;Confirmar por este grupo&apos;
							</p>
						</div>
						<div className="flex flex-col gap-y-2">
							{preliminaryResults.map((name) => (
								<div key={name} className="inline-flex items-center">
									<label className="relative flex cursor-pointer items-center rounded-full p-2">
										<input
											name="invitation-to-rsvp-radio"
											type="radio"
											value={name}
											className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-foreground/30 checked:border-foreground/40 transition-all"
											onChange={() => {
												const index = invitationMap.get(name);
												if (index) {
													handleUserSelect(index);
												}
											}}
										/>
										<span className="absolute bg-foreground w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
									</label>
									<label className="cursor-pointer text-base">{name}</label>
								</div>
							))}
						</div>
						<button
							disabled={!selectedInvitation}
							onClick={() => {
								setStep("RSVP");
							}}
							className="bg-foreground disabled:bg-foreground/35 px-4 py-4 w-fit rounded-md text-background mt-4 font-highlights">
							Confirma por este grupo
						</button>
					</div>
				);
			case "RSVP":
				return (
					<div className="flex flex-col gap-y-4 justify-center">
						<div className="flex flex-col gap-y-0">
							<p className="font-highlights text-3xl md:text-4xl font-serif max-w-3/4 mb-1">¿Podrás acompañarnos?</p>
						</div>
						<div className="flex flex-col gap-y-2">{renderInputsOfSelectedInvitation} </div>
						{selectedInvitation?.Confirm1 && (
							<div className="flex flex-col gap-y-2 mt-4">
								<p className="uppercase font-extralight text-sm tracking-wide">Cédula de {selectedInvitation?.Name1}</p>
								<input
									className="border border-foreground/30 rounded-md p-2"
									onChange={(e) => setInputCC1(e.target.value ?? "")}
									placeholder="Escribe la cédula"
									value={inputCC1}
								/>
							</div>
						)}
						{selectedInvitation?.Confirm2 && (
							<div className="flex flex-col gap-y-2">
								<p className="uppercase font-extralight text-sm tracking-wide">Cédula de {selectedInvitation?.Name2}</p>
								<input
									className="border border-foreground/30 rounded-md p-2"
									onChange={(e) => setInputCC2(e.target.value ?? "")}
									placeholder="Escribe la cédula"
									value={inputCC2}
								/>
							</div>
						)}
						<button
							disabled={disableSendButton}
							onClick={handleSend}
							className="bg-foreground disabled:bg-foreground/35 px-4 py-4 w-fit rounded-md text-background mt-4 font-highlights">
							Confirmar
						</button>
					</div>
				);
		}
	}, [
		step,
		nameToSearch.length,
		handleSearch,
		preliminaryResults,
		disableSendButton,
		selectedInvitation,
		renderInputsOfSelectedInvitation,
		inputCC1,
		inputCC2,
		handleSend,
		invitationMap,
		handleUserSelect,
	]);

	return (
		<>
			<Head>
				<title>Confirmar Asistencia - Matrimonio de Emi y Yeyo</title>
				<meta name="description" content="Confirma tu asistencia al matrimonio de Emi y Yeyo el 24 de enero de 2026 en Bogotá, Colombia." />
			</Head>
			<div className="flex items-center justify-center bg-ey-bronze min-h-screen w-full overflow-hidden">
				<main className="secure-bottom-pad min-h-[100vh] p-6 pt-10 bg-ey-white overflow-y-auto flex relative flex-col w-full max-w-[100vw] md:max-w-[800px] md:w-[75vw] items-center sm:items-start">
					{renderContent}
					<div className="flex flex-col w-full justify-start gap-y-5">{renderSteps}</div>
					<Loader open={loading} fullscreen opaque />
				</main>
				<Dialog
					open={successfulRSVP}
					title={"¡Gracias por confirmar tu asistencia!"}
					subtitle={selectedInvitation?.Confirm1 || selectedInvitation?.Confirm2 ? "¡Que alegría que puedan acompañarnos!" : ""}
					onClose={() => {
						window.location.reload();
					}}>
					<div className="relative flex h-80 w-full items-center justify-center">
						<img src={"/assets/DTORTUGAM.png"} alt="Thank you" className="object-contain h-full" />
					</div>
					<div className="flex justify-center">
						<Link href="/" className="tracking-wider text-sm underline">
							volver al inicio
						</Link>
					</div>
				</Dialog>
			</div>
		</>
	);
}
