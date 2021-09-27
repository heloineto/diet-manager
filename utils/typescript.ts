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

export const indexOfNth = (str: string, subStr: string, index: number) =>
  str.split(subStr, index).join(subStr).length;

export const isKeyInShallowObject = <T = Record<string, any>>(
  key: any,
  obj: T
): key is keyof typeof obj => {
  return Object.keys(obj).includes(key);
};
