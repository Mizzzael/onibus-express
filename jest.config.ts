import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '@heroui/react': '<rootDir>/__mocks__/@heroui/$1'
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
}

export default createJestConfig(config)