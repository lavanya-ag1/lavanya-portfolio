import os
from PIL import Image, ImageDraw, ImageFont

def make_cert(filename, title, issuer, subtitle, recipient, details, date_str, badge_text, theme_color='#6366f1'):
    width, height = 1600, 1120
    img = Image.new('RGB', (width, height), '#fcfdfd')
    draw = ImageDraw.Draw(img)

    # Borders
    draw.rectangle([(24, 24), (width-24, height-24)], outline='#cbd5e1', width=2)
    draw.rectangle([(34, 34), (width-34, height-34)], outline=theme_color, width=3)
    draw.rectangle([(42, 42), (width-42, height-42)], outline='#f1f5f9', width=1)

    try:
        font_issuer = ImageFont.truetype('arialbd.ttf', 32)
        font_sub = ImageFont.truetype('arial.ttf', 18)
        font_title = ImageFont.truetype('arialbd.ttf', 36)
        font_name = ImageFont.truetype('arialbd.ttf', 46)
        font_body = ImageFont.truetype('arial.ttf', 22)
        font_badge = ImageFont.truetype('arialbd.ttf', 18)
    except:
        font_issuer = font_sub = font_title = font_name = font_body = font_badge = None

    # Top Header
    draw.text((width//2, 100), issuer.upper(), fill=theme_color, font=font_issuer, anchor='mm')
    draw.text((width//2, 140), subtitle, fill='#64748b', font=font_sub, anchor='mm')

    # Badge Pill
    draw.rounded_rectangle([(width//2 - 120, 175), (width//2 + 120, 215)], radius=20, fill='#f1f5f9', outline='#cbd5e1')
    draw.text((width//2, 195), badge_text, fill='#334155', font=font_badge, anchor='mm')

    # Certificate of Achievement
    draw.text((width//2, 270), 'CERTIFICATE OF ACHIEVEMENT', fill='#0f172a', font=font_title, anchor='mm')
    draw.text((width//2, 320), 'THIS ACKNOWLEDGES THAT', fill='#64748b', font=font_sub, anchor='mm')

    # Recipient
    draw.text((width//2, 385), recipient, fill='#0f172a', font=font_name, anchor='mm')
    draw.line([(width//2 - 200, 425), (width//2 + 200, 425)], fill=theme_color, width=3)

    # Details
    draw.text((width//2, 475), f'has successfully completed the requirements for', fill='#64748b', font=font_sub, anchor='mm')
    draw.text((width//2, 530), title, fill='#0f172a', font=font_title, anchor='mm')

    draw.multiline_text((width//2, 650), details, fill='#334155', font=font_body, anchor='mm', align='center', spacing=14)

    # Bottom footer
    draw.line([(180, 940), (480, 940)], fill='#94a3b8', width=1)
    draw.text((330, 965), date_str, fill='#0f172a', font=font_badge, anchor='mm')
    draw.text((330, 990), 'Date of Issuance', fill='#64748b', font=font_sub, anchor='mm')

    draw.line([(width - 480, 940), (width - 180, 940)], fill='#94a3b8', width=1)
    draw.text((width - 330, 965), 'Verified Credential Authority', fill='#0f172a', font=font_badge, anchor='mm')
    draw.text((width - 330, 990), f'{issuer} Certification Program', fill='#64748b', font=font_sub, anchor='mm')

    out_path = f'portfolio/client/public/{filename}'
    img.save(out_path, quality=95)
    print(f'Generated {out_path}')

if __name__ == '__main__':
    make_cert(
        'cert-deeplearning.png',
        'Building Systems with ChatGPT API & RAG',
        'DeepLearning.AI',
        'In Collaboration with OpenAI',
        'Lavanya Agarwal',
        'Demonstrated practical proficiency in designing LLM-powered applications,\n'
        'vector search retrieval, document chunking algorithms, prompt engineering,\n'
        'and orchestrating context-augmented generative pipelines.',
        'February 2026',
        'SPECIALIZATION CREDENTIAL',
        '#0284c7'
    )

    make_cert(
        'cert-nptel-dbms.png',
        'Database Management Systems (Elite)',
        'NPTEL / IIT Kharagpur',
        'National Programme on Technology Enhanced Learning (Ministry of Education)',
        'Lavanya Agarwal',
        'Awarded for successfully passing the comprehensive 12-week computer science course\n'
        'covering Relational Database Architecture, SQL, Normalization (1NF–BCNF),\n'
        'B+ Trees, Query Optimization, and Concurrency Control (ACID).',
        'November 2025',
        'ELITE ACADEMIC CERTIFICATE',
        '#d97706'
    )

    make_cert(
        'cert-hackerrank.png',
        'Problem Solving & Python Competency',
        'HackerRank Skill Certification',
        'HackerRank Assessment Division',
        'Lavanya Agarwal',
        'Successfully completed the rigorous standardized skill assessment\n'
        'evaluating Algorithmic Problem Solving, Complex Data Structures,\n'
        'Dynamic Programming, and Computational Time Complexity in Python.',
        'October 2025',
        'VERIFIED GOLD BADGE',
        '#10b981'
    )

    make_cert(
        'cert-hackjklu.png',
        'HackJKLU \'26 Finalist & Core Lead',
        'JK Lakshmipat University',
        'Annual Flagship All-India Hackathon',
        'Lavanya Agarwal',
        'Recognized for exceptional technical coordination and prototype engineering\n'
        'in HackJKLU 2026, leading technical infrastructure and project delivery\n'
        'amongst 500+ participants nationwide.',
        'March 2026',
        'HACKATHON EXCELLENCE AWARD',
        '#8b5cf6'
    )
