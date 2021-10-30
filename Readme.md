## Local

```bash
yarn install
npx playwright test
```

## Docker

```bash
docker run --rm -it --ipc=host --user pwuser --security-opt seccomp=seccomp_profile.json $(docker build -q .) npx playwright test
```
