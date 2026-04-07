import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { SPREADSHEET_ID } from "../constants";

export async function POST(req: NextRequest) {
	try {
		const auth = new GoogleAuth({
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
			keyFile: path.join(process.cwd(), "google-api-credentials.json"),
		});
		const sheets = google.sheets({ version: "v4", auth });
		const body: {
			index: number;
			percentageCommited: number;
			name: string;
			phone: string;
			artPieceName: string;
			amount: number;
			artPieceId: string;
		} = await req.json();

		const inputRow = body.index + 2;

		// 1. Update percentageCommited in ART sheet (column G)
		const updateResult = await sheets.spreadsheets.values.update({
			spreadsheetId: SPREADSHEET_ID,
			range: `ART!G${inputRow}`,
			valueInputOption: "RAW",
			requestBody: {
				values: [[body.percentageCommited]],
			},
		});

		if (updateResult.status !== 200) {
			return NextResponse.json({ error: true }, { status: 400 });
		}

		// 2. Append commitment record to ART_COMMITMENTS sheet
		const appendResult = await sheets.spreadsheets.values.append({
			spreadsheetId: SPREADSHEET_ID,
			range: "ART_COMMITMENTS!A:E",
			valueInputOption: "RAW",
			requestBody: {
				values: [[body.name, body.phone, body.artPieceName, body.amount, body.artPieceId, "PENDIENTE"]],
			},
		});

		if (appendResult.status !== 200) {
			return NextResponse.json({ error: true }, { status: 400 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.log("Error accessing Google Sheets:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
