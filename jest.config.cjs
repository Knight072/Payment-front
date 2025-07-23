// test/jest.front.config.js
/** @type {import('jest').Config} */
module.exports = {

  // Preset de TypeScript
  preset: 'ts-jest',

  // Entorno DOM virtual para React Testing Library
  testEnvironment: 'jsdom',

  // Solo correr los tests que estén dentro de /test (u otra ruta que quieras)
  roots: ['<rootDir>/src/test'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Ignora compilados y dependencias
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Manejo de importaciones de recursos
  moduleNameMapper: {
    // Archivos de estilos
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    // Archivos de imagen
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
  },

  // Polyfills / extensiones antes de cada test
  setupFiles: ['reflect-metadata'],
  

  // Cobertura solo del código front (src)
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/front',
}
