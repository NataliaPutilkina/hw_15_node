1. Install dependencies
   npm init -y
   npm install typescript ts-node @types/node --save-dev

2. Create config tsconfig.json

3. Add to ur config
   {
   "compilerOptions": {
   "target": "ES2021", // Generated js vers
   "module": "commonjs", // module or imports
   "strict": true, // must it be strict
   "esModuleInterop": true, // import packages via import
   "outDir": "./dist", // where compiled files go
   "rootDir": "./src", // source to traspilation
   "resolveJsonModule": true, // import JSON
   "skipLibCheck": true // fast build
   },
   "include": ["src"], // dirs for compilations
   "exclude": ["node_modules"]
   }

4. Add scripts to package.json :
   "scripts": {
   "start": "node dist/index.js",
   "dev": "ts-node src/index.ts",
   "build": "tsc"
   }

5. Project structure :
   /src
   -> -> -> ->index.ts
   tsconfig.json
   package.json

6. npm run dev

! GL HF !

- if u want to use imports (ESM) instead of require ->
  tsconfig => "module": "ESNext"
  packcage json => "type": "module"
