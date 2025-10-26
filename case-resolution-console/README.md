# Case Resolution Console (placeholder)

Top-level README with quick start.

- Start DB & Redis: docker compose up -d
- To install node dependencies in an isolated environment (no npm required on host):

  1. Make sure Docker is installed and running.
  2. From PowerShell run:

     docker compose -f docker/docker-compose.dev.yml run --rm node_install

  This runs a Node 20 container that installs `api` and `web` dependencies using `npm ci`.

- Install API deps locally (if you have npm):

  ```powershell
  cd 'c:\Users\us\OneDrive\Desktop\fs_project1\case-resolution-console\api'
  npm install
  ```

- Install Web deps locally (if you have npm):

  ```powershell
  cd 'c:\Users\us\OneDrive\Desktop\fs_project1\case-resolution-console\web'
  npm install
  ```
