import * as migration_20240921_095309 from './20240921_095309';

export const migrations = [
  {
    up: migration_20240921_095309.up,
    down: migration_20240921_095309.down,
    name: '20240921_095309'
  },
];
