# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-01-14

### Added

- **Rollup bundling system** - Replaced TypeScript compiler with Rollup for better bundling
- **Dual format support** - Package now provides both CommonJS (`dist/index.js`) and ES Modules (`dist/index.esm.js`)
- **Comprehensive test suite** - Added 12 unit tests using Vitest and React Testing Library
- **TypeScript declarations** - Automatic generation of `.d.ts` files for better TypeScript support
- **GitHub Actions CI/CD** - Automated testing and npm publishing
- **Development tools** - Added `dev`, `test:watch`, `test:coverage` scripts
- **Code minification** - Production files are minified by Terser
- **Source maps** - Added source maps for better debugging

### Changed

- **Build system** - Migrated from `tsc` to `rollup -c` for better build control
- **Package structure** - Reorganized package files with better `.npmignore`
- **Dependencies** - Moved React to `peerDependencies` instead of `dependencies`
- **TypeScript config** - Optimized TypeScript configuration for Rollup
- **Hook implementation** - Fixed hook to use `Date.now()` instead of `new Date()` for better test compatibility

### Fixed

- **Test environment** - Fixed issues with `setInterval`/`clearInterval` mocks in test environment
- **Build output** - Fixed generation of output files
- **Package.json** - Added missing fields: `module`, `types`, `files`, `keywords`, `repository`, `bugs`, `homepage`
- **Documentation** - Extended README.md with more examples and test section

### Technical Improvements

- **Rollup configuration** - Configuration with plugins: typescript, commonjs, node-resolve, terser, dts
- **Test setup** - Vitest configuration with jsdom environment
- **Code quality** - Added `.editorconfig` for formatting consistency
- **CI/CD pipeline** - GitHub Actions workflow for automated testing and publishing

### Dependencies Added

- `rollup` - Bundler
- `@rollup/plugin-typescript` - TypeScript support
- `@rollup/plugin-commonjs` - CommonJS support
- `@rollup/plugin-node-resolve` - Node.js module resolution
- `@rollup/plugin-terser` - Code minification
- `rollup-plugin-dts` - TypeScript declarations
- `vitest` - Test runner
- `@testing-library/react` - React testing utilities
- `jsdom` - DOM environment for tests
- `tslib` - TypeScript runtime library

## [1.0.2] - 2025-01-XX

### Added

- Initial release of react-countdown-hook
- Support for countdown timers with pause/resume functionality
- TypeScript support with full type definitions
- Error handling for invalid dates
- Support for both string and Date object inputs
- Direction indicator for past/future countdowns

### Features

- `useCountdown` hook with time calculation
- Pause/resume functionality
- Real-time updates every second
- Comprehensive error handling
- TypeScript interfaces for better development experience
