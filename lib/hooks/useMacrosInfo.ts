const useMacrosInfo = () => {
  return {
    carbInfo: {
      key: <'carb'>'carb',
      label: 'Carboidrato',
      compactLabel: 'Carboid.',
      color: '#a78bfa',
      kcalPerUnit: 4,
    },
    protInfo: {
      key: <'prot'>'prot',
      label: 'Proteina',
      compactLabel: 'Proteina',
      color: '#60a5fa',
      kcalPerUnit: 4,
    },
    fatInfo: {
      key: <'fat'>'fat',
      label: 'Gordura',
      compactLabel: 'Gordura',
      color: '#fbbf24',
      kcalPerUnit: 9,
    },
    kcalInfo: {
      key: <'kcal'>'kcal',
      label: 'Caloria',
      compactLabel: 'Caloria',
      color: '#10b981',
      kcalPerUnit: 1,
    },
  };
};

export default useMacrosInfo;
