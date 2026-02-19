import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./_components/navbar";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Diego & Maca - Boda 6 de Junio 2026 | Pereira, Colombia",
	description:
		"Te invitamos a celebrar nuestra boda el 6 de junio de 2026 en la Hacienda San Jorge, Cerritos, Pereira. Ceremonia, coctel y cena. ¡Confirma tu asistencia!",
	keywords: [
		"Diego y Maca",
		"boda",
		"matrimonio",
		"wedding",
		"junio 2026",
		"Hacienda San Jorge",
		"Pereira",
		"Cerritos",
		"Colombia",
		"invitación de boda",
		"RSVP",
	],
	authors: [{ name: "Diego & Maca" }],
	creator: "Diego & Maca",
	publisher: "Diego & Maca",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://diegoymaca.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Diego & Maca - Boda 6 de Junio 2026",
		description: "Celebra con nosotros nuestra boda el 6 de junio de 2026 en la Hacienda San Jorge, Pereira. ¡Te esperamos!",
		url: "https://diegoymaca.com",
		siteName: "Diego & Maca Wedding",
		images: [
			{
				url: "/assets/invitacion.png",
				width: 1200,
				height: 630,
				alt: "Diego & Maca - Invitación de Boda",
			},
			{
				url: "/apple-touch-icon.png",
				width: 180,
				height: 180,
				alt: "Diego & Maca",
			},
		],
		locale: "es_CO",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Diego & Maca - Boda 6 de Junio 2026",
		description: "Te invitamos a celebrar nuestra boda en Pereira, Colombia. ¡Confirma tu asistencia!",
		images: ["/assets/invitacion.png"],
		creator: "@diegoymaca",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
			{ url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
		],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
		other: [
			{
				rel: "android-chrome-192x192",
				url: "/android-chrome-192x192.png",
			},
			{
				rel: "android-chrome-512x512",
				url: "/android-chrome-512x512.png",
			},
		],
	},
	manifest: "/site.webmanifest",
	themeColor: "#ffffff",
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 5,
	},
	verification: {
		google: "google-site-verification-code-here",
		// Add your actual verification codes when available
	},
	category: "wedding",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
