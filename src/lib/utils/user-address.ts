type address = {
  city: string;
  street: string;
  number: number;
};

function formatUserAddress(addr: address) {
  const capitalize = (str: string) => {
    const tokens = str.split(" ");
    let output = "";

    for (const tok of tokens) {
      output += tok.slice(0, 1).toUpperCase() + tok.slice(1) + " ";
    }

    return output.trim();
  };

  return `${addr.number.toString()} ${capitalize(addr.street)}, ${capitalize(
    addr.city
  )}`;
}

function parseUserAddress(addr: string) {
  const num = addr.split(" ")[0];
  const number = Number(num);
  const street = addr.split(",")[0].slice(num.length).toLocaleLowerCase();
  const city = addr.split(",")[1];

  return { number, street, city };
}

export { formatUserAddress };
