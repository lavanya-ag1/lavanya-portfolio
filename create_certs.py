import os
from PIL import Image, ImageDraw, ImageFont

def generate_dynamicore_cert():
    width, height = 1600, 1120
    img = Image.new('RGB', (width, height), '#fcfdfd')
    draw = ImageDraw.Draw(img)

    # Borders
    draw.rectangle([(24, 24), (width-24, height-24)], outline='#cbd5e1', width=2)
    draw.rectangle([(34, 34), (width-34, height-34)], outline='#0284c7', width=3)
    draw.rectangle([(42, 42), (width-42, height-42)], outline='#f1f5f9', width=1)

    # Logo
    logo_path = 'portfolio/client/public/word/media/image1.png'
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        logo.thumbnail((380, 130), Image.Resampling.LANCZOS)
        img.paste(logo, (width//2 - logo.width//2, 60), logo)

    try:
        font_title = ImageFont.truetype('arial.ttf', 36)
        font_sub = ImageFont.truetype('arial.ttf', 19)
        font_name = ImageFont.truetype('arialbd.ttf', 44)
        font_body = ImageFont.truetype('arial.ttf', 22)
        font_bold = ImageFont.truetype('arialbd.ttf', 22)
    except:
        font_title = font_sub = font_name = font_body = font_bold = None

    draw.text((width//2, 220), 'INTERNSHIP COMPLETION CERTIFICATE', fill='#0f172a', font=font_title, anchor='mm')
    draw.text((width//2, 260), 'Ref: DSPL/HR/2026/AI-042  |  Issued: 20-July-2026', fill='#64748b', font=font_sub, anchor='mm')

    draw.text((width//2, 320), 'THIS CERTIFICATE IS PROUDLY PRESENTED TO', fill='#0369a1', font=font_sub, anchor='mm')
    draw.text((width//2, 380), 'Ms. Lavanya Agarwal', fill='#0f172a', font=font_name, anchor='mm')
    draw.line([(width//2 - 200, 415), (width//2 + 200, 415)], fill='#0284c7', width=3)

    body_text = (
        'for successfully completing her 2-month internship as an AI/ML Intern at Dynamicore Strategies Pvt. Ltd.,\n'
        'from 18 May 2026 to 18 July 2026. During this tenure, she developed the production system:\n\n'
        '\"AI-Powered Multi-Agent News Research and Analysis System\"\n\n'
        'implementing intelligent retrieval pipelines with FastAPI, LangChain, LangGraph, RAG architecture,\n'
        'and pgvector semantic memory. She demonstrated exemplary technical dedication and problem-solving.'
    )
    draw.multiline_text((width//2, 550), body_text, fill='#334155', font=font_body, anchor='mm', align='center', spacing=14)

    # Seal on left bottom
    seal_path = 'portfolio/client/public/word/media/image3.png'
    if os.path.exists(seal_path):
        seal = Image.open(seal_path).convert('RGBA')
        seal.thumbnail((160, 160), Image.Resampling.LANCZOS)
        img.paste(seal, (240, 880), seal)

    # Signature on right bottom
    sig_path = 'portfolio/client/public/word/media/image2.png'
    if os.path.exists(sig_path):
        sig = Image.open(sig_path).convert('RGBA')
        sig.thumbnail((220, 90), Image.Resampling.LANCZOS)
        img.paste(sig, (width - 440, 890), sig)

    draw.line([(width - 480, 990), (width - 180, 990)], fill='#94a3b8', width=1)
    draw.text((width - 330, 1010), 'Mr. Nikhil Gupta', fill='#0f172a', font=font_bold, anchor='mm')
    draw.text((width - 330, 1035), 'Director, Dynamicore Strategies Pvt. Ltd.', fill='#64748b', font=font_sub, anchor='mm')

    out_path = 'portfolio/client/public/cert-dynamicore-internship.png'
    img.save(out_path, quality=95)
    print(f'Generated {out_path}')

if __name__ == '__main__':
    generate_dynamicore_cert()
