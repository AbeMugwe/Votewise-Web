import json, re, sys
from pypdf import PdfReader

sectors={15:"Agriculture",16:"MSME economy",19:"Housing",20:"Housing",23:"Healthcare",24:"Healthcare",26:"Digital economy",27:"Creative economy",29:"Water and roads",30:"Energy",31:"Energy and transport",34:"Manufacturing",36:"Financial services and tourism",37:"Aviation",39:"Sports",40:"Sports",42:"Environment and climate",43:"Environment and climate",44:"Waste management",46:"Education",47:"Education",49:"Women",50:"Women",51:"Youth",53:"Social protection",54:"Older persons",55:"Persons with disabilities",57:"Governance",58:"Rights and justice",59:"Governance",60:"Devolution and security",61:"Security",63:"Foreign policy",64:"Diaspora",65:"Diaspora"}
reader=PdfReader(sys.argv[1]); out=[]
for page_no,sector in sectors.items():
    lines=[re.sub(r"\s+"," ",x).strip() for x in (reader.pages[page_no-1].extract_text() or "").splitlines()]
    current=None
    for line in lines:
        if re.match(r"^[•�]\s*",line):
            if current: out.append({"page":page_no,"sector":sector,"promise":current})
            current=re.sub(r"^[•�]\s*","",line)
        elif current and not re.match(r"^(PAGE|THE PLAN|\d+$|Financial Commitment|Kenya Kwanza Commitment)",line,re.I):
            current+=" "+line
    if current: out.append({"page":page_no,"sector":sector,"promise":current})
for x in out:
    # Preserve semantic hyphens and numeric ranges (for example 2.5kg-7.5kg).
    # PDF extraction already joins the page's physical lines above; removing every
    # hyphen followed by whitespace corrupts quantities and compound terms.
    x["promise"]=x["promise"].strip(" ;")
json.dump([x for x in out if len(x["promise"])>15],sys.stdout)
