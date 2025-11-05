Upgrade notes - CRA to Vite migration:

- Replaced react-scripts with Vite 5 for faster dev/build.
- Start: npm run start (Vite dev server on port 3000 by default or REACT_APP_PORT)
- Build: npm run build (outputs to build/)
- Preview: npm run preview (serves built app on port 3000)

Testing:
- Switched to Vitest. Run tests with: npm test
- Setup file: src/setupTests.js (jest-dom integrated)

Environment variables:
- Continue to use REACT_APP_* variables. Vite exposes by default via import.meta.env only for VITE_*.
- To keep compatibility in code using process.env.REACT_APP_*, Vite injects process.env at runtime if defined externally in the environment where the server runs.
- If you need to access variables in the browser via Vite convention, mirror them as VITE_* or adapt code to use import.meta.env.

No application source code changes were required for React 18.3 and react-router-dom 6.28.
