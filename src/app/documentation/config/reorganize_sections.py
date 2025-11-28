import re

# Read the file
with open('documentation.config.tsx', 'r') as f:
    content = f.read()

# Find the sections array start
start_marker = "const sections: DocSection[] = ["
end_marker = "];\n\n\nexport { sections };"

# Extract everything before sections array
before_sections = content.split(start_marker)[0] + start_marker + "\n"

# Extract everything after sections array
after_sections = "\n" + end_marker

# Split into individual sections
sections_content = content.split(start_marker)[1].split(end_marker)[0]

# Find all section starts (id: 'xxx',)
section_pattern = r"  {\n    id: '([^']+)',"
section_ids = re.findall(section_pattern, sections_content)

print(f"Found {len(section_ids)} sections:")
for sid in section_ids:
    print(f"  - {sid}")

# Extract each section
sections = {}
lines = sections_content.split('\n')
current_section = None
current_content = []
brace_count = 0

for line in lines:
    # Check if this is a section start
    match = re.match(r"  {\n    id: '([^']+)',", line + '\n' + (lines[lines.index(line)+1] if lines.index(line)+1 < len(lines) else ''))
    if match and brace_count == 0:
        # Save previous section
        if current_section:
            sections[current_section] = '\n'.join(current_content)
        # Start new section
        current_section = None
        current_content = []
    
    # Track braces
    brace_count += line.count('{') - line.count('}')
    
    # Add line to current section
    if current_section or (match := re.match(r"  {\n", line)):
        if not current_section and 'id:' in line:
            match = re.search(r"id: '([^']+)'", line)
            if match:
                current_section = match.group(1)
        current_content.append(line)
        
        # Check if section is complete
        if current_section and brace_count == 0 and line.strip() == '},':
            sections[current_section] = '\n'.join(current_content)
            current_section = None
            current_content = []

print(f"\nExtracted {len(sections)} sections")

