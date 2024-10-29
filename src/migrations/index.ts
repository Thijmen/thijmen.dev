import * as migration_20241016_175315 from './20241016_175315';
import * as migration_20241029_111051 from './20241029_111051';

export const migrations = [
  {
    up: migration_20241016_175315.up,
    down: migration_20241016_175315.down,
    name: '20241016_175315',
  },
  {
    up: migration_20241029_111051.up,
    down: migration_20241029_111051.down,
    name: '20241029_111051'
  },
];
