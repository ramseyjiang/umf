export function year() {
  return new Date().getFullYear();
}

export function month() {
  let month = new Date().getMonth() + 1;
  if (month >= 10) {
    return month;
  } else {
    return "0" + month;
  }
}

export function day() {
  return new Date().getDate();
}
