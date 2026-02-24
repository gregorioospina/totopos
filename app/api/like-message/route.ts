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
		const body: { index: number; likes: number } = await req.json();

		const spreadsheetId = SPREADSHEET_ID;
		const inputRow = body.index + 2;

		const rangeToInput = `GIFT_NOTES!D${inputRow}`;
		const resource = {
			values: [[body.likes + 1]],
		};

		const result = await sheets.spreadsheets.values.update({
			spreadsheetId,
			range: rangeToInput,
			valueInputOption: "RAW",
			requestBody: resource,
		});

		if (result.status === 200) {
			return NextResponse.json({ success: true, newLikes: body.likes + 1 });
		}

		return NextResponse.json({ error: true }, { status: 400 });
	} catch (error) {
		console.log("Error accessing Google Sheets:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
