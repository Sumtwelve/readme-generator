// TODO: Include packages needed for this application
const generateMarkdown = require("./utils/generateMarkdown.js");
const inquirer = require("inquirer");
const fs = require("fs");

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
                // BRANCH A: GUIDED
        {
            type: "editor",
            message: "Use default text editor to write custom description. Save and close editor to submit. ",
            name: "descTextLong",
            when: (answers) => answers.descGuidedOrScratch === "Guided"
        },
                // BRANCH B: FROM SCRATCH
        {
            type: "input",
            message: "Answer these questions in 1-2 sentences.\nWhat problem does your project intend to solve, if any?",
            name: "descProblem",
            when: (answers) => answers.descGuidedOrScratch === "From scratch"
        },
        {
            type: "input",
            message: "How does it solve that problem?",
            name: "descHowSolveProblem",
            when: (answers) => answers.descGuidedOrScratch === "From scratch"
        },
        {
            type: "input",
            message: "What did you learn from creating this project?",
            name: "descWhatLearned",
            when: (answers) => answers.descGuidedOrScratch === "From scratch"
        },
        // DESCRIPTION BRANCHING POINT OVER

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
            when: (answers) => answers.createInstGuideYesNo === "yes"
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
            name: "credUsedThirdPartyAssets"
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
            name: "credUsedTutorials"
        },
        {
            type: "editor",
            message: "Use default text editor to mention the tutorials. Please place one title and one URL on each line. Save and exit editor to submit. ",
            name: "credTutorialAttributions"
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
            when: (answers) => answers.addContributeSection === "Yes"
        },

    // ---- tests ----
        {
            type: "list",
            message: "Would you like to add a Tests section?",
            choices: ["Yes", "No"],
            name: "addTestsSection"
        },
        {
            type: "editor",
            message: "Use default text editor to describe how users may apply tests to your code. Save and exit editor to submit. ",
            name: "testsText"
        },

    // ---- table of contents ----
        {
            type: "list",
            message: "Would you like to add a Table of Contents to your README?",
            choices: ["Yes", "No"],
            name: "addTOC"
        }
    ])
    .then((answers) => {
        fs.writeFile("README.md", generateMarkdown(answers), ((err) => err ? console.err(err) : console.log("README.md successfully written!")));
    })
