#!/bin/bash
ts-node ./node_modules/typeorm/cli migration:generate -d ormconfig.ts src/infra/typeorm/migrations/$1
