const fs = require('fs');
const path = require('path');

/**
 * The file path to the markdown document.
 * @type {string}
 */
const filePath = process.argv[2];

if (!filePath) {
    console.error('Error: No file specified as the first argument');
    process.exit(1);
}

/**
 * The content of the markdown document.
 * @type {string}
 */
const fileContent = fs.readFileSync(filePath, 'utf8');

/**
 * An array of lines from the markdown document.
 * @type {string[]}
 */
const lines = fileContent.split('\n');

/**
 * Extracts the table of contents from an array of lines in a markdown document.
 * @param {string[]} lines - The lines of the markdown document.
 * @returns {string} The formatted table of contents.
 */
const extractTableOfContents = (lines) => {
    const toc = [];
    let inCodeBlock = false;
    const codeBlockRegex = /^```/;
    const headingRegex = /^#{1,}/;

    lines.forEach(line => {
        if (codeBlockRegex.test(line)) {
            inCodeBlock = !inCodeBlock;
            return;
        }

        if (!inCodeBlock && headingRegex.test(line)) {
            toc.push(line);
        }
    });

    return toc.map(line => {
        const level = line.match(/^#+/)[0].length;
        const title = line.replace(/^#+\s*/, '');
        const link = title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        return '  '.repeat(level - 1) + `- [${title}](#${link})`;
    }).join('\n');
};

/**
 * Removes the existing table of contents from the markdown content.
 * @param {string} content - The markdown content.
 * @returns {string} The markdown content without the table of contents.
 */
const removeExistingTOC = (content) => content.replace(/## Table of Contents\n(?:.*\n)*?\n/, '');

/**
 * Inserts the new table of contents into the markdown content.
 * @param {string} content - The markdown content.
 * @param {string} toc - The formatted table of contents.
 * @returns {string} The markdown content with the new table of contents inserted.
 */
const insertNewTOC = (content, toc) => content.replace(/(#[^\n]*\n)/, `$1\n## Table of Contents\n${toc}\n\n`);

/**
 * Updates the table of contents in the specified markdown document.
 * @param {string} filePath - The path to the markdown document.
 */
const updateTableOfContents = (filePath) => {
    const toc = extractTableOfContents(lines);
    const updatedContent = removeExistingTOC(fileContent);
    const newContent = insertNewTOC(updatedContent, toc);
    fs.writeFileSync(filePath, newContent);
    console.log('Table of Contents updated successfully.');
};

updateTableOfContents(filePath);
