import fs from "fs";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import path from "path";
import { SPREADSHEET_ID } from "../constants";

export async function GET() {
	try {
		const credPath = path.join(process.cwd(), "google-api-credentials.json");
		console.log("Credentials path:", credPath);
		console.log("File exists:", fs.existsSync(credPath));

		const auth = new GoogleAuth({
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
			keyFile: credPath,
		});
		const sheets = google.sheets({ version: "v4", auth });

		const spreadsheetId = SPREADSHEET_ID;
		const range = "ART!A2:G1000";

		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range,
		});

		if (response.data.values) {
			return NextResponse.json({ art: response.data.values });
		} else {
			return NextResponse.json({ error: "No data found" }, { status: 400 });
		}
	} catch (error: unknown) {
		console.error("Error accessing Google Sheets:");
		console.error("Error message:", error instanceof Error ? error.message : String(error));
		console.error("Error stack:", error instanceof Error ? error.stack : undefined);
		return NextResponse.json(
			{
				error: "Internal Server Error",
				message: error instanceof Error ? error.message : "Unknown error",
				details: process.env.NODE_ENV === "development" && error instanceof Error ? error.stack : undefined,
			},
			{ status: 500 },
		);
	}
}
