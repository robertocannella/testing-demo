# testing-demo

## Setting up repository
open folder in VSCode.

```
git init -b main

git add . && git commit -m "initial commit"
```
from VS code version control menu, select publish repostiory

## Install Jest with Development flags

```
npm i jest --save-dev

touch .gitignore
```
add ``` node_modules/``` to .gitignore file


## Update package.json
### Change the test property from:
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
### to:
```
  "scripts": {
    "test": "jest"
  },
```

## Create test files:

files ending with spec or test . ts or js (x)

```
  testMatch: **/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x) - 0 matches

  testPathIgnorePatterns: /node_modules/ - 6 matches
  testRegex:  - 0 matches
```
