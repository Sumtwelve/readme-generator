// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  // If the variable license has contents (i.e. is NOT null), generate Shields IO badge
  if (license) {
    // Note that the Shields IO format is LABEL-MESSAGE-COLOR.
    // For licenses, LABEL should always be "license".
    // Since user was not given the opportunity to customize badge color, Shields IO's default green is chosen.
    return `![a small badge indicating the \"${license}\" license](https://img.shields.io/badge/license-${encodeURIComponent(license)}-green)`;
  }

  return "";
}

// A function to generate the entire Table of Contents
// Parameter "sections" is an array containing the titles of all sections user has elected to include in the README.
function generateTOC(sections) {
  let toc = `## Table of Contents\n\n`;
  for (let section of sections) {
    let link = generateTOCLink(section);
    toc += link + "\n\n";
  }
  return `${toc}---\n\n---\n\n`;
}

// A function to take a section's title and format it for in-document markdown links.
// It simply takes a string, lowercases it, turns all spaces into hyphens,
// then turns it into markdown link format: → [Link Text](#link-location)
function generateTOCLink(sectionName) {
  if (sectionName) {
    let hyphenated = sectionName.toLowerCase().replaceAll(" ", "-");
    return `→ [${sectionName}](#${hyphenated})`;
  } else {
    return "";
  }
}

// A function to generate the entire README using the answers from the inquirer (referred to as object "data")
function generateMarkdown(data) {
  // VARIABLE INITIALIZATION
  // Explanation: The user can elect to include or omit certain sections.
  // In cases of omission, a blank string will be printed into the README.
  // Note that some README sections are not presented as optional, such as title, usage, and license.

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
    sections.splice(sections.indexOf("Installation"), 1);
  }

  // ---- credits
  if (data.createCreditsYesNo === "Yes") {
    data.credTitleText = "---\n\n## Credits";
  } else {
    sections.splice(sections.indexOf("Credits"), 1);
  }

  if (data.credCollabYesNo === "Yes") data.credCollabHeader = "**Collaborators**";
  if (data.credUsedTutorials === "Yes") data.credTutorialHeader = "**Tutorials I Followed**";

  // ---- how to contribute
  if (data.createContributeSectionYesNo === "Yes") {
    data.contributeTitleText = "---\n\n## How to Contribute";
  } else {
    sections.splice(sections.indexOf("How to Contribute"), 1);
  }

  // ---- tests
  if (data.createTestsSectionYesNo === "Yes") {
    data.testsTitleText = "---\n\n## Tests";
  } else {
    sections.splice(sections.indexOf("Tests"), 1);
  }

  // create table of contents
  if (data.createTOCYesNo === "Yes") {
    data.tocTitleText = "---\n\n## Table of Contents";
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

---

## Usage
${data.usageGuideText}

${data.credTitleText}
${data.credCollabHeader}
${data.credCollaborators}
${data.credTutorialHeader}
${data.credTutorialAttributions}

---

## License
${data.license}

${data.contributeTitleText}
${data.howToContributeText}

${data.testsTitleText}
${data.testsText}
`.replaceAll("undefined", "").replaceAll("\n\n\n\n\n", "").replaceAll("\n\n\n", "\n\n").trim();
}
// I know that last line there looks dumb, but it works.
// It erases huge newline gaps and then nicely formats all lines to be 2 newlines apart.
// (Then it gets rid of any extra newlines still hanging onto the end.)
// I've discovered that markdown does not actually show huge newline gaps when rendered,
// but they are still visible in the actual `.md` file and I think it looks bad.

module.exports = generateMarkdown;
