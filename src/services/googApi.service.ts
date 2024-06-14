import { auth } from "../app";
import { connectGoogleSheet } from "../utils/connectGoogleSheet";
import { sheetHeading } from "../utils/sheetHeadings";

export const appendDataInSheetController = async (
  sheetData: Record<string, unknown>
) => {
  const googleSheet = await connectGoogleSheet();
  const spreadsheetId = "1djwwYUSrumNb0IIpmLJNl2rWp1YlCFtdi9DKfhNQrtU";

  // Map sheetData to match sheet headings
  const data = sheetHeading.map((head) => {
    const value = sheetData[head];
    if (value === undefined || value === null) {
      return "UNKNOWN"; // Handle undefined or null values
    }
    return value.toString(); // Ensure value is a string
  });

  try {
    const res = await googleSheet.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: `Sheet1!A2:B`, // Adjust the range as per your sheet structure
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [data],
      },
    });

    console.log("Data appended successfully:", res.data);
    return res;
  } catch (err) {
    console.error("Error appending data:", err);
    throw err;
  }
};
