import { google } from "googleapis";
import { auth } from "../app";

export const connectGoogleSheet = async () => {
  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: "v4", auth: client });
  return googleSheet;
};
