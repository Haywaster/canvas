# Paint online
## Important
Only free solutions were used, so locally it literally flies!    

## Installation and startup
1. Install **bun** on your computer. Next steps:
* `bun` - Dependency installation (_**client** and **server**_)
* `bun dev` - Simultaneous launch of project and server (_only **client** root_)
2. Rename the environment variables file **.env.example** to **.env.local** (_his location in **client** root_)
3. Once launched, you can go to http://localhost:3000/ and enjoy!

## Stack
The following stack is used in the project

#### Dependencies:
* `classnames: 2.5.1`
* `react: 18.3.1`
* `react-dom: 18.3.1`
* `react-router-dom: 6.24.1`
* `react-toastify: 10.0.5`
* `zustand: 4.5.4`

####  dev Dependencies:
* `@eslint/compat: 1.1.1`
* `@eslint/js: 9.7.0`
* `@types/react: 18.3.3`
* `@types/react-dom: 18.3.0`
* `@vitejs/plugin-react: 4.3.1`
* `concurrently: 8.2.2`
* `eslint: 9.7.0`
* `eslint-config-prettier: 9.1.0`
* `eslint-plugin-prettier: 5.2.1`
* `eslint-plugin-react: 7.34.4`
* `eslint-plugin-react-hooks: 4.6.2`
* `eslint-plugin-react-refresh: 0.4.8`
* `eslint-plugin-unused-imports: 4.0.0`
* `globals: 15.8.0`
* `husky: 9.1.1`
* `lint-staged: 15.2.7`
* `prettier: 3.3.2`
* `sass: 1.71.1`
* `stylelint: 16.7.0`
* `stylelint-config-standard-scss: 13.1.0`
* `typescript: 5.2.2`
* `typescript-eslint: 7.16.1`
* `vite: 5.3.1`
* `vite-plugin-svgr: 4.2.0`

## Teams for development:

* `bun run build` - standard build of the vite application into the **dist** folder
* `bun run lint` - eslint check
* `bun run lint:fix` - eslint check & fix
* `bun run style` - stylelint check
* `bun run style:fix` - stylelint check & fix
* `bun run format` - prettier
* `bun run prepare` - husky install