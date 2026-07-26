export function getFormattedDateString(date, format = "yyyy-mm-dd", separator = "-") {
  const dateString = date?.toLocaleDateString(), // mm/dd/yyyy
    dateStringSeparator = "/";

  if (!dateString) return "";

  let formattedDateStringPieces = [];

  const formatPieces = format.split(separator),
    dateStringPieces = dateString.split(dateStringSeparator),
    dateStringPiecesLength = dateStringPieces.length;

  for (const formatPiece of formatPieces) {
    let piece;

    if (formatPiece === "yyyy")
      piece = dateStringPieces[dateStringPiecesLength - 1];
    else if (formatPiece === "mm")
      piece = dateStringPieces[dateStringPiecesLength - 3];
    else if (formatPiece === "dd")
      piece = dateStringPieces[dateStringPiecesLength - 2];

    piece = +piece < 10 ? "0" + piece : piece;

    formattedDateStringPieces.push(piece);
  }

  return formattedDateStringPieces.join(separator);
}
