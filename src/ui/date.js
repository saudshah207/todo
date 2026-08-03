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

export function setMinimumDueDateValues() {
  const dateInputElements = document.querySelectorAll("input[type='date']");

  const minimumDate = new Date();
  minimumDate.setHours(0, 0, 0, 0);

  const minimumDateString = getFormattedDateString(minimumDate);

  for (const element of dateInputElements) {
    element.min = minimumDateString;
  }
}
