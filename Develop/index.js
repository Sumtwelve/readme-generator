const generateMarkdown = require("./utils/generateMarkdown.js");
const inquirer = require("inquirer");
const fs = require("fs");

// Welcome the user to the software
console.log("Welcome to Sumtwelve's README generator!");
console.log("Follow the steps to have a concise, professional README in just minutes.");
console.log("TIP: This program understands markdown. Feel free to include markdown formatting in any of your responses.");
console.log("\nLet's start with your title.");

// NOTE ON THE INQUIRER:
// I make frequent use of the "when" property here. "When" takes in a conditional statement (which must be inside an arrow function)
// and causes the prompt to show only when that statement evaluates to true. This is used to allow the user to fully customize
// the README.
inquirer
    .prompt([
    // ---- title and description ----
        {
            type: "input",
            message: "--- TITLE ---\nWhat is your project title?",
            name: "title"
        },    
        // BRANCHING POINT: DESCRIPTION
        {
            type: "list",
            message: "--- DESCRIPTION ---\nDo you want to be guided through writing your description, or to write one from scratch?",
            choices: ["Guided", "From scratch"],
            name: "descGuidedOrScratch"
        },
        {
            type: "editor",
            message: "Use default text editor to write custom description. Save and close editor to submit. ",
            name: "descTextLong",
            when: (answers) => answers.descGuidedOrScratch === "From scratch"
        },
        {
            type: "input",
            message: "Answer these questions in 1-2 sentences.\nWhat problem does your project intend to solve, if any?",
            name: "descProblem",
            when: (answers) => answers.descGuidedOrScratch === "Guided"
        },
        {
            type: "input",
            message: "How does it solve that problem?",
            name: "descHowSolveProblem",
            when: (answers) => answers.descGuidedOrScratch === "Guided"
        },
        {
            type: "input",
            message: "Describe what you learned from working on this project?",
            name: "descWhatLearned",
            when: (answers) => answers.descGuidedOrScratch === "Guided"
        },

    // ---- installation ----
        {
            type: "list",
            message: "--- INSTALLATION ---\nWould you like to create an Installation guide for your README?",
            choices: ["Yes", "No"],
            name: "createInstGuideYesNo"
        },
        {
            type: "editor",
            message: "What does the user need to do to install the application? Save the document and exit the editor to submit. ",
            name: "instGuideText",
            when: (answers) => answers.createInstGuideYesNo === "Yes"
        },

    // ---- usage ----
        {
            type: "editor",
            message: "--- USAGE ---\nUse default text editor to describe how the application should be used.\nFor example, how should someone use the software to solve the problem you mentioned above? What's the first thing a user should do once the application is loaded?",
            name: "usageGuideText"
        },

    // ---- credits ----
        {
            type: "list",
            message: "--- CREDITS ---\nWould you like to add a Credits section?",
            choices: ["Yes", "No"],
            name: "createCreditsYesNo"
        },
        {
            type: "list",
            message: "Did you collaborate with anyone for this project?",
            choices: ["Yes", "No"],
            name: "credCollabYesNo",
            when: (answers) => answers.createCreditsYesNo === "Yes"
        },
        {
            type: "editor",
            message: "Use default text editor to record their names and a link to their GitHub profiles. Please place one name and one URL on each line. Save and exit editor to submit. ",
            name: "credCollaborators",
            when: (answers) => answers.credCollabYesNo === "Yes"
        },
        {
            type: "list",
            message: "Did you use any third-pary assets that require attribution?",
            choices: ["Yes", "No"],
            name: "credUsedThirdPartyAssets",
            when: (answers) => answers.createCreditsYesNo === "Yes"
        },
        {
            type: "editor",
            message: "Use default text editor to give the creators of these assets their due credit. Please place one name and one URL on each line. Save and exit editor to submit. ",
            name: "credAssetAttributions",
            when: (answers) => answers.credUsedThirdPartyAssets === "Yes"
        },
        {
            type: "list",
            message: "Did you follow any tutorials you'd like to mention in your README?",
            choices: ["Yes", "No"],
            name: "credUsedTutorials",
            when: (answers) => answers.createCreditsYesNo === "Yes"
        },
        {
            type: "editor",
            message: "Use default text editor to mention the tutorials. Please place one title and one URL on each line. Save and exit editor to submit. ",
            name: "credTutorialAttributions",
            when: (answers) => answers.credUsedTutorials === "Yes"
        },

    // ---- license ----
        {
            type: "list",
            message: "What license does your project have?",
            choices: ["None", "MIT License", "Apache License 2.0", "GNU General Public License v3.0", "BSD 2-Clause \"Simplified\"", "BSD 3-Clause \"New\" or \"Revised\"", "Boost Software License 1.0", "Creative Commons Zero v1.0 Universal", "Eclipse Public License 2.0", "GNU Affero General Public License v3.0", "GNU General Public License v2.0", "GNU Lesser General Public License v2.1", "Mozilla Public License 2.0", "The Unlicense"],
            name: "license"
        },

    // ---- how to contribute ----
        {
            type: "list",
            message: "Would you like to add a How To Contribute section?",
            choices: ["Yes", "No"],
            name: "createContributeSectionYesNo"
        },
        {
            type: "editor",
            message: "Use default text editor to briefly describe how users may contribute to your project. Save and exit editor to submit. ",
            name: "howToContributeText",
            when: (answers) => answers.createContributeSectionYesNo === "Yes"
        },

    // ---- tests ----
        {
            type: "list",
            message: "Would you like to add a Tests section?",
            choices: ["Yes", "No"],
            name: "createTestsSectionYesNo"
        },
        {
            type: "editor",
            message: "Use default text editor to describe how users may apply tests to your code. Save and exit editor to submit. ",
            name: "testsText",
            when: (answers) => answers.createTestsSectionYesNo === "Yes"
        },

    // ---- table of contents ----
        {
            type: "list",
            message: "Would you like to add a Table of Contents to your README?",
            choices: ["Yes", "No"],
            name: "createTOCYesNo"
        }
    ])
    .then((answers) => {
        // Completed README will be stored in the `generated/` folder. If that folder doesn't exist, program will create it.
        if (!fs.existsSync("./generated/")) {
            fs.mkdirSync("./generated/");
        }
        
        // If there is already a README in the `generated/` folder, then this new one needs a unique name
        // so that the old one doesn't get overwritten. The simplest way to make a unique name is to add a number after it.
        // We'll get that number from the number of READMEs that already exist in the folder.
        // For example, if there's just one README already in the folder, this new README will be called "README_2.md".
        // We therefore need to count how many files in the folder have names starting with "README".
        let newReadmeFileName = "README"; // default; this will be the filename if there are zero READMEs already in `generated/`
        let readmeCount = 0;
        let generatedFiles = fs.readdirSync("./generated/", (err) => {if (err) console.error(err)});
        for (let fileName of generatedFiles) {
            if (fileName.includes(".md"))
                readmeCount++;
        }

        if (readmeCount > 0) {
            // Adding 1 to the readmeCount here will give the file a proper ordinal number.
            newReadmeFileName = `README_${readmeCount + 1}`;
        }

        fs.writeFile(
            `./generated/${newReadmeFileName}.md`,
            generateMarkdown(answers),
            ((err) => err ? console.error(err) : console.log(`${newReadmeFileName}.md successfully written!`))
        );
        
    });
