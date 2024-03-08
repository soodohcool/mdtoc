import sys
import re

def extract_table_of_contents(lines):
    # Initialize variables
    toc = []
    in_code_block = False
    code_block_regex = re.compile(r'^```')
    heading_regex = re.compile(r'^#{1,}')

    # Iterate through each line in the document
    for line in lines:
        # Toggle in_code_block if a code block delimiter is found
        if code_block_regex.match(line):
            in_code_block = not in_code_block
            continue

        # If not in a code block and the line is a heading, add it to the TOC
        if not in_code_block and heading_regex.match(line):
            toc.append(line)

    # Format each line in the TOC
    formatted_toc = []
    for line in toc:
        level = len(re.match(r"^#+", line)[0])  # Determine the heading level
        title = re.sub(r"^#+\s*", "", line)  # Extract the title text
        link = re.sub(r"\s+", "-", re.sub(r"[^\w\s]", "", title.lower()))  # Create a URL-friendly link
        formatted_toc.append(f'{"  " * (level - 1)}- [{title}](#{link})')  # Format the line

    return formatted_toc

def remove_existing_toc(content):
    # Remove any existing Table of Contents section
    return re.sub(r'## Table of Contents\n(?:.*\n)*?\n', '', content)

def insert_new_toc(content, toc):
    # Create the new TOC section
    toc_section = '\n## Table of Contents\n' + '\n'.join(toc) + '\n\n'
    # Insert the new TOC section after the first heading
    return re.sub(r'(#[^\n]*\n)', r'\1' + toc_section, content)

def update_table_of_contents(file_path):
    # Read the contents of the file
    with open(file_path, 'r', encoding='utf-8') as file:
        file_content = file.read()

    # Split the content into lines and extract the TOC
    lines = file_content.split('\n')
    toc = extract_table_of_contents(lines)
    # Remove any existing TOC and insert the new one
    updated_content = remove_existing_toc(file_content)
    new_content = insert_new_toc(updated_content, toc)

    # Write the updated content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(new_content)

    print('Table of Contents updated successfully.')

if __name__ == '__main__':
    # Check if a file path was provided as an argument
    if len(sys.argv) < 2:
        sys.exit('Error: No file specified as the first argument')

    file_path = sys.argv[1]
    update_table_of_contents(file_path)  # Update the TOC for the specified file
