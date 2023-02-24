![a small badge indicating the MIT License license](https://img.shields.io/badge/license-MIT%20License-green)

# README Generator

**The problem:** Writing READMEs can be a little unwieldy and overwhelming, but it is a crucial part of any project's repository. I and maybe lots of other beginners could benefit from being guided through the README-writing process.

**The solution:** By guiding the user through a series of short prompts, a simple README is generated automatically by the software. In fact, this README you're reading right now was made using this generator!

Working on this project gave me some needed familiarity with the Markdown format, as well as with Node's `fs` library. It also gave me the opportunity to create a tutorial video, which was definitely a first for me.

---

## Table of Contents

→ [Installation](#installation)

→ [Usage](#usage)

→ [License](#license)

→ [How to Contribute](#how-to-contribute)

---

---

## Installation
Follow these steps to install the README Generator:

(You can also watch [this video](#) (coming soon) for a visual tutorial)

1. Make sure you have [Node.js](https://nodejs.org/en/) and the latest build of NPM installed.
2. Clone this repository (or fork it if you want to make contributions).
3. Open a Bash/CMD/Powershell window and navigate to the root folder of the repo on your computer.
4. Enter the command `npm i`. This will install all dependencies (in this case, it will just install Inquirer).
5. Enter `node index.js` to run the software.

## Usage
How to generate a README:

1. Once you've entered `node index.js` to run the software in your terminal, follow the prompts to fill out each section of the README.
2. Locate the finished README in the `generated/` folder.
3. Manually move the README file to where you need it on your computer.
4. Note that if a `README.md` file already exists in `generated/`, it will save a `README_##.md` file next to it. Be sure to rename the file back to `README.md` after you've moved it.

## License
MIT License

## How to Contribute
To request a new feature or submit a bug report, simply [create a new issue on this repo](https://github.com/Sumtwelve/readme-generator/issues/new).
Or if you prefer, you can simply open a pull request from your fork, include your reasons for any alterations, and I'll review it and merge it when I get the chance.
You can also copy or screenshot any error message and email it to me at sumtwelve@gmail.com
All contributions, suggestions, and bug reports are greatly appreciated!