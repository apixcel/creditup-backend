import { OAuth2Client } from "google-auth-library";
import { google, sheets_v4 } from "googleapis";
import { auth } from "../app";

export const connectGoogleSheet = async (): Promise<sheets_v4.Sheets> => {
  const client = await auth.getClient();

  // Ensure the client is an OAuth2Client
  if (!(client instanceof OAuth2Client)) {
    throw new Error("Expected OAuth2Client");
  }

  const googleSheet = google.sheets({ version: "v4", auth: client });
  return googleSheet;
};
