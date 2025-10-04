/** @jest-config-loader ts-node */
import type { Config } from 'jest';
import {defaults} from 'jest-config';
const { createDefaultPreset } = require("ts-jest");


const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg
  },
  moduleDirectories: [...defaults.moduleDirectories, "./node_modules" ],
}


export default config;