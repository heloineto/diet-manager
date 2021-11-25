export const authErrors: {
  [code: string]: { message: string; faultyField: string };
} = {
  'auth/user-not-found': {
    message: 'E-mail incorreto ou inexistente. Tente outro.',
    faultyField: 'email',
  },
  'auth/wrong-password': {
    message:
      'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para redefini-la',
    faultyField: 'password',
  },
  'auth/email-already-in-use': {
    message: 'Já existe uma conta associada a este e-mail. Tente outro',
    faultyField: 'email',
  },
};

export interface FirebaseAuthError {
  code: string;
  message: string;
}

export const isFirebaseAuthError = (error: unknown): error is FirebaseAuthError => {
  return (
    (error as FirebaseAuthError).code !== undefined &&
    (error as FirebaseAuthError).message !== undefined
  );
};
