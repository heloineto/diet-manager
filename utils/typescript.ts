export const safeguard = <T>(
  object: { [k: string]: T } | undefined,
  keys: string[],
  fallback: T
) => {
  if (!object) return Object.fromEntries(keys.map((key) => [key, fallback]));

  for (const key in keys) {
    if (!object[key]) {
      object = Object.assign(object, { [key]: fallback });
    }
  }

  return object;
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
