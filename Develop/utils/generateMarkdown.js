// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  // If the variable license has contents (i.e. is NOT null), generate Shields IO badge
  if (license) {
    // Note that the Shields IO format is LABEL-MESSAGE-COLOR.
    // For licenses, LABEL should always be "license".
    // Since user was not given the opportunity to customize badge color, Shields IO's default green is chosen.
    return `![a small badge indicating the ${license} license](${encodeURIComponent(`https://img.shields.io/badge/license-${license}-green`)})`;
  }

  return "";
}

// TODO: Create a function that returns the license link for the README's ToC
// If there is no license, return an empty string
function renderLicenseLink(license) {

}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  
}

function generateTOC(sections) {
  let toc = `## Table of Contents\n`;
  for (let section of sections) {
    let link = generateTOCLink(section);
    toc += link + "\n";
  }
  return toc;
}

function generateTOCLink(sectionName) {
  if (sectionName) {
    let hyphenated = sectionName.toLowerCase().replaceAll(" ", "-");
    return `[${sectionName}](#${hyphenated})`;
  } else {
    return "";
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  console.log("We have made it to the generateMarkdown() function");

  // Variable initialization
  // The user can elect to include or omit certain sections.
  // In cases of omission, a blank string will be printed into the README.
  // Note that some README sections are not presented as optional, such as title, usage, and license.

  // If an inquirer prompt was not shown to the user, its data when referenced will print "undefined".
  // To fix this, loop through the data and set any "undefined" elements to an empty string instead.
  for (let element of Object.values(data)) {
    if (element === undefined) element = "";
  }

  // These variables were created here. You will not find them in the inquirer prompts.
  // I prefixed them with "data" because it just made more sense for these variables to blend in with the ones from inquirer.
  data.instTitleText = "";
  data.credTitleText = "";
  data.credCollabHeader = "";
  data.credTutorialHeader = "";
  data.contributeTitleText = "";
  data.testsTitleText = "";
  data.tocTitleText = "";

  // An array of all possible sections that can be included in the generated README.
  // This will be used when creating the table of contents.
  // If the user elects to not create a section, it will be removed from this array, and thus a ToC link will not be made for it.
  //                              required             required
  let sections = ["Installation", "Usage", "Credits", "License", "How to Contribute", "Tests"];
  let toc = ""; // empty string will take up no space in README if user elects not to create a ToC

  // ---- installation
  if (data.createInstGuideYesNo === "Yes") {
    data.instTitleText = "## Installation";
  } else {
    sections.splice(sections.indexOf("Installations"), 1);
  }

  // ---- credits
  if (data.createCreditsYesNo === "Yes") {
    data.credTitleText = "## Credits";
  } else {
    sections.splice(sections.indexOf("Credits"), 1);
  }

  if (data.credCollabYesNo === "Yes") data.credCollabHeader = "**Collaborators**";
  if (data.credUsedTutorials === "Yes") data.credTutorialHeader = "**Tutorials I Followed**";

  // ---- how to contribute
  if (data.createContributeSectionYesNo === "Yes") {
    data.contributeTitleText == "## How to Contribute";
  } else {
    sections.splice(sections.indexOf("How to Contribute"), 1);
  }

  // ---- tests
  if (data.createTestsSectionYesNo === "Yes") {
    data.testsTitleText = "## Tests";
  } else {
    sections.splice(sections.indexOf("Tests"), 1);
  }

  // create table of contents
  if (data.createTOCYesNo === "Yes") {
    data.tocTitleText = "## Table of Contents";
    toc = generateTOC(sections);
  }


  // NOW WE GENERATE THE README!!!
  return `${renderLicenseBadge(data.license)}

# ${data.title}
${data.descTextLong}**The problem:** ${data.descProblem}
**The solution:** ${data.descHowSolveProblem}
${data.descWhatLearned}

${toc}

${data.instTitleText}
${data.instGuideText}

## Usage
${data.usageGuideText}

${data.credTitleText}
${data.credCollabHeader}
${data.credCollaborators}
${data.credTutorialHeader}
${data.credTutorialAttributions}

## License
${data.license}

${data.contributeTitleText}
${data.howToContributeText}

${data.testsTitleText}
${data.testsText}
`.replaceAll("undefined", "");
}

module.exports = generateMarkdown;
