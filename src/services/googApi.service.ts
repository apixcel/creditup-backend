import { auth } from "../app";
import { connectGoogleSheet } from "../utils/connectGoogleSheet";
import { sheetHeading } from "../utils/sheetHeadings";
export const appendDataInSheetController = async (
  sheetData: Record<string, unknown>
) => {
  const googleSheet = await connectGoogleSheet();
  const spreadsheetId = "1NkczMUsM3Su-AmpQpRWb6QpConYxHxhVndvbnhmTwf8";

  // const { data } = req.body;

  const data = sheetHeading.map((head) => sheetData[head] || "UNKNOWN");

  const res = googleSheet.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `Sheet1!A2:B`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [data],
    },
  });

  return res;
};
