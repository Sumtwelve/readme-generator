// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license, msg, color) {
  // If the variable license has contents (i.e. is NOT null), generate Shields IO badge
  if (license) {
    return `https://img.shields.io/badge/${license}-${msg}-${color}`;
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
  return `# ${data.title}

`;
}

module.exports = generateMarkdown;
