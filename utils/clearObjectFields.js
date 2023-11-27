export default function (object) {
  Object.keys(object).forEach(
    (key) =>
      (object[key] === undefined ||
        !object[key] ||
        (Array.isArray(object[key]) && !object[key]?.length)) &&
      delete object[key],
  );
}
