// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  // If the variable license has contents (i.e. is NOT null), generate Shields IO badge
  if (license) {
    // Note that the Shields IO format is LABEL-MESSAGE-COLOR.
    // For licenses, LABEL should always be "license".
    // Since user was not given the opportunity to customize badge color, Shields IO's default green is chosen.
    return `![a small badge indicating what license is attached to the project](https://img.shields.io/badge/license-${license}-green)`;
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

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
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
  data.instTitleText = "";
  data.credTitleText = "";
  data.credCollabHeader = "";
  data.credTutorialHeader = "";
  data.contributeTitleText = "";

  if (data.createInstGuideYesNo === "Yes") data.instTitleText = "## Installation";
  if (data.createCreditsYesNo === "Yes") data.credTitleText = "## Credits";

  if (data.credCollabYesNo === "Yes") data.credCollabHeader = "**Collaborators**";
  if (data.credUsedTutorials === "Yes") data.credTutorialHeader = "**Tutorials I Followed**";

  if (data.createContributeSectionYesNo === "Yes") data.contributeTitleText == "## How to Contribute";

  // NOW WE GENERATE THE README!!!
  return `${renderLicenseBadge(data.license)}

  # ${data.title}
${data.descTextLong}**The problem:** ${data.descProblem}
**The solution:** ${data.descHowSolveProblem}
${data.descWhatLearned}

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
`;
}

module.exports = generateMarkdown;
