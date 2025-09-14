export const SEED_DATA = {
  warehouse: {
    name: 'Almacén Central Santo Domingo',
  },

  aisles: [
    { code: 'A', name: 'Pasillo A - Electrónicos' },
    { code: 'B', name: 'Pasillo B - Hogar' },
    { code: 'C', name: 'Pasillo C - Automotriz' },
  ] as const,

  activityTypes: ['PUTAWAY', 'PICK', 'MOVE', 'ADJUSTMENT'] as const,
} as const;
