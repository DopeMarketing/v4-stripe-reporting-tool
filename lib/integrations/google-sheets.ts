import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_SHEETS_API_KEY,
});

export interface SpreadsheetData {
  spreadsheetId: string;
  range: string;
  values: string[][];
}

export interface Spreadsheet {
  spreadsheetId: string;
  properties: {
    title: string;
    locale: string;
  };
}

export async function getSheetData(spreadsheetId: string, range: string): Promise<SpreadsheetData> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return {
      spreadsheetId,
      range,
      values: response.data.values || [],
    };
  } catch (error) {
    throw new Error(`Failed to fetch sheet data: ${error}`);
  }
}

export async function updateSheetData(spreadsheetId: string, range: string, values: string[][]): Promise<void> {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: { values },
    });
  } catch (error) {
    throw new Error(`Failed to update sheet data: ${error}`);
  }
}