# TEAM 293 AUTO SIMULATION

## Table of Contents
1. [Running a Development Server]("#Running a Development Server")
2. [Building for Production](#Building for Production)

## Running a Development Server <a name="Running a Development Server"></a>
1. Install the latest version of [Node.js]("https://nodejs.org/en/")
- 1.5 This project only uses NPM from node js

2. Install yarn
``` bash
npm install --global yarn
```
- 2.5 Go [here]("https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable") to view alternative ways to install yarn

3. Clone the repo
``` bash
git clone https://github.com/LavaWaffle/auto-sim.git
cd auto-sim
```

4. Start a development server
``` bash
yarn watch
```
- 4.5 If you get an error in step 4 about your execution policy you may need to run the following in your powershell
``` bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

5. Go to [http://localhost:3000/]("http://localhost:3000/") to see the sim

6. To stop the development server press "ctrl + c"

## Building for Production <a name="Building for Production"></a>
1. Follow steps 1-3 from running a development server

2. Build the code
``` bash
yarn build
```

3. The production ready code will be found in the **dist** folder