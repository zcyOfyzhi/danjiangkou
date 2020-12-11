let baseUrl = "http://10.6.172.163:7301/djkglpt-xc";

const http = (url, data) =>
  fetch(
    baseUrl + url,
    data
      ? {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        }
      : { method: "POST" }
  ).then(resp => resp.json());

const padStart = (str, digit, replace) => {
  str = str.toString();
  return str.length >= digit
    ? str
    : Array.from(new Array(digit), (v, i) => {
        return str[str.length - i - 1] ? str[str.length - i - 1] : replace;
      })
        .reverse()
        .join("");
};

const padEnd = (str, digit, replace) => {
  str = str.toString();
  return str.length >= digit
    ? str
    : Array.from(new Array(digit), (v, i) => {
        return str[i] ? str[i] : replace;
      }).join("");
};

export { http, padStart, padEnd };
