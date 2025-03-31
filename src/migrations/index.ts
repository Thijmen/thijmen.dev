import * as migration_20250108_114137 from './20250108_114137';
import * as migration_20250227_120406 from './20250227_120406';
import * as migration_20250306_201341 from './20250306_201341';

export const migrations = [
  {
    up: migration_20250108_114137.up,
    down: migration_20250108_114137.down,
    name: '20250108_114137',
  },
  {
    up: migration_20250227_120406.up,
    down: migration_20250227_120406.down,
    name: '20250227_120406',
  },
  {
    up: migration_20250306_201341.up,
    down: migration_20250306_201341.down,
    name: '20250306_201341'
  },
];
