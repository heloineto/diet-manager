export const safeguard = <T>(
  object: { [k: string]: T } | undefined,
  keys: string[],
  fallback: T
) => {
  const safeObject = { ...object };

  if (!safeObject) return Object.fromEntries(keys.map((key) => [key, fallback]));

  for (const key of keys) {
    if (!safeObject[key]) {
      safeObject[key] = fallback;
    }
  }

  return safeObject;
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
