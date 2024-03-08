### MDTOC

MDTOC is a utility that automatically generates and updates a Table of Contents (TOC) for a Markdown file. It scans the Markdown file for headings (lines starting with `#`) and creates a TOC based on these headings. The TOC is inserted into the Markdown file right after the first heading. If a TOC already exists, it is replaced with the updated version. The script ensures that code blocks (enclosed in triple ```) are ignored when generating the TOC.

The script supports multiple levels of headings (subsections), which are determined by the number of `#` characters at the beginning of the heading line. For example, `#` denotes a top-level heading, `##` denotes a second-level heading (subsection), `###` denotes a third-level heading, and so on. The TOC will reflect this structure by indenting subsections appropriately.

### Usage - Node

1. Ensure that Node.js is installed on your system.
2. Save the script to a file, for example, `mdtoc.js`.
3. Open a terminal or command prompt.
4. Navigate to the directory containing the script and the Markdown file.
5. Run the script with the path to the Markdown file as an argument:

   ```bash
   node mdtoc.js path/to/your/markdown-file.md
   ```
6. The script will update the Markdown file with a new TOC after the first heading.

### Usage - Python

1. Ensure that Python 3 is installed on your system.
2. Save the script to a file, for example, `mdtoc.py`.
3. Open a terminal or command prompt.
4. Navigate to the directory containing the script and the Markdown file.
5. Run the script with the path to the Markdown file as an argument:

   ```bash
   python mdtoc.py path/to/your/markdown-file.md
   ```
6. The script will update the Markdown file with a new TOC after the first heading.

### Example

***NOTE:*** There is a sample.md file included so you can try it out immediately. 

Assuming you have a Markdown file named `example.md` with the following content:

```markdown
# My Markdown Document

## Introduction

This is an introduction.

## Section 1

Content for section 1.

### Subsection 1.1

Details for subsection 1.1.

### Subsection 1.2

Details for subsection 1.2.

## Section 2

Content for section 2.

### Subsection 2.1

Details for subsection 2.1.
```

After running the script with `node mdtoc.js example.md` (or python version), the updated `example.md` file will look like this:

```markdown
# My Markdown Document

## Table of Contents

- [Introduction](#introduction)
- [Section 1](#section-1)
  - [Subsection 1.1](#subsection-11)
  - [Subsection 1.2](#subsection-12)
- [Section 2](#section-2)
  - [Subsection 2.1](#subsection-21)

## Introduction

This is an introduction.

## Section 1

Content for section 1.

### Subsection 1.1

Details for subsection 1.1.

### Subsection 1.2

Details for subsection 1.2.

## Section 2

Content for section 2.

### Subsection 2.1

Details for subsection 2.1.
```
