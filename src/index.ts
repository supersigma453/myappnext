import * as fs from 'node:fs';
import { getOctokit } from '@actions/github';
import { getInput } from '@actions/core';

const token = getInput("gh-token");
const octokit = getOctokit(token);

async function updateReadme() {
  const readmePath = 'README.md';
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');

  const htmlContent = `
<!-- START_SECTION:html -->
<h2>My Custom HTML Content</h2>
<p>This is some <strong>HTML</strong> content added by GitHub Actions.</p>
<!-- END_SECTION:html -->
  `;

  fs.writeFileSync(readmePath, htmlContent);

  console.log('README updated successfully');
}

updateReadme().catch(console.error);
