function decode(message) {
  const rows = message.length;
  if (rows === 0) return "";
  const cols = message[0].length;
  if (cols === 0) return "";

  let result = "";
  let i = 0;
  let j = 0;

  let directionY = 1;

  while (j < cols) {
    result += message[i][j];
    if (i === rows - 1) {
      directionY = -1;
    }
    if (i === 0) {
      directionY = 1;
    }

    i += directionY;
    j += 1;
  }

  return result;
}
