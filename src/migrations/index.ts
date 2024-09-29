import * as migration_20240921_095309 from './20240921_095309';
import * as migration_20240922_081248_locale_unique_indexes from './20240922_081248_locale_unique_indexes';
import * as migration_20240922_125434 from './20240922_125434';
import * as migration_20240929_151904 from './20240929_151904';
import * as migration_20240929_152042 from './20240929_152042';

export const migrations = [
  {
    up: migration_20240921_095309.up,
    down: migration_20240921_095309.down,
    name: '20240921_095309',
  },
  {
    up: migration_20240922_081248_locale_unique_indexes.up,
    down: migration_20240922_081248_locale_unique_indexes.down,
    name: '20240922_081248_locale_unique_indexes',
  },
  {
    up: migration_20240922_125434.up,
    down: migration_20240922_125434.down,
    name: '20240922_125434',
  },
  {
    up: migration_20240929_151904.up,
    down: migration_20240929_151904.down,
    name: '20240929_151904',
  },
  {
    up: migration_20240929_152042.up,
    down: migration_20240929_152042.down,
    name: '20240929_152042'
  },
];
