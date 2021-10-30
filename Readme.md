```bash
yarn install
npx playwright test
```

```bash
docker run --rm -it --ipc=host --user pwuser --security-opt seccomp=seccomp_profile.json $(docker build -q .) npx playwright test
```
