export function getFormattedDateString(
  date,
  format = "yyyy-mm-dd",
  separator = "-",
) {
  if (!date) return "";

  let formattedDatePieces = [];

  const formatPieces = format.split(separator);

  for (const formatPiece of formatPieces) {
    let piece;

    if (formatPiece === "yyyy") piece = date.getFullYear();
    else if (formatPiece === "mm") piece = date.getMonth() + 1;
    else if (formatPiece === "dd") piece = date.getDate();

    piece = piece < 10 ? "0" + piece : piece;

    formattedDatePieces.push(piece);
  }

  return formattedDatePieces.join(separator);
}
