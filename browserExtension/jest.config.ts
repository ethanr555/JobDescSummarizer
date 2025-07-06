/** @jest-config-loader ts-node */
import type { Config } from 'jest';
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
}

export default config;