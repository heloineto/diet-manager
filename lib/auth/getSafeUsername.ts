import { docExists } from '@lib/utils/firestore';
import { getRandomInt } from '@lib/utils/typescript';
import { kebabCase } from 'lodash';

const getSafeUsername = async (uid: string, preferredUsername: string) => {
  let username = kebabCase(preferredUsername);
  let exists = await docExists(`usernames/${username}`);

  if (exists) {
    const oldUsername = username;
    let attempts = 0;

    while (exists) {
      if (attempts > 10) return uid;

      username = `${oldUsername}-${getRandomInt(9999)}`;
      exists = await docExists(`usernames/${username}`);

      attempts++;
    }
  }

  return username;
};

export default getSafeUsername;
