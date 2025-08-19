type name = {
  firstname: string;
  lastname: string;
};

export default function formatName(name: name) {
  return `${
    name.firstname.slice(0, 1).toUpperCase() + name.firstname.slice(1)
  } ${name.lastname.slice(0, 1).toUpperCase() + name.lastname.slice(1)}`;
}
