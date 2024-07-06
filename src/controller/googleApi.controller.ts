import { sheets_v4 } from "googleapis";
import { auth } from "../app";
import { catchAsyncError } from "../utils/catchAsyncError";
import { connectGoogleSheet } from "../utils/connectGoogleSheet";

export const readSheetController = catchAsyncError(async (req, res) => {
  const googleSheet = await connectGoogleSheet();
  const spreadsheetId = "1NkczMUsM3Su-AmpQpRWb6QpConYxHxhVndvbnhmTwf8";

  const getSheetData = await googleSheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });
  res.status(200).json({ data: getSheetData });
});

export const deleteRowFromSheetController = catchAsyncError(
  async (req, res) => {
    const googleSheet = await connectGoogleSheet();
    const spreadsheetId = "1NkczMUsM3Su-AmpQpRWb6QpConYxHxhVndvbnhmTwf8";

    // Assuming the row index to delete is provided in the request parameters
    const rowIndex = parseInt(req.params.rowIndex, 10) || 3; // Default to row 3 if not provided

    const request: sheets_v4.Schema$BatchUpdateSpreadsheetRequest = {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 0,
              dimension: "ROWS",
              startIndex: rowIndex - 1,
              endIndex: rowIndex,
            },
          },
        },
      ],
    };

    // Execute the request to delete the row
    const response = await googleSheet.spreadsheets.batchUpdate({
      auth,
      spreadsheetId,
      requestBody: request,
    });

    res.send(response);
  }
);
