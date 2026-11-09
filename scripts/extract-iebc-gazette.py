import json, re, sys
from pypdf import PdfReader

pattern=re.compile(r"^(\d{3})\s+(.+?)\s+(\d{3})\s+(.+?)\s+(\d{4})\s+(.+?)\s+(\d{3})\s+(.+?)\s+(\d{15})\s+(.+?)\s+(\d+)$")
rows=[]
for page in PdfReader(sys.argv[1]).pages[1:]:
    lines=[re.sub(r"\s+"," ",x).strip() for x in (page.extract_text() or "").splitlines()]
    records=[]
    for line in lines:
        if re.match(r"^\d{3}\s",line): records.append(line)
        elif records and not re.match(r"^(County|Code|Reg\.|Centre|THE KENYA|\d+(?:st|nd|rd|th) July)",line): records[-1]+=" "+line
    for record in records:
        m=pattern.match(record)
        if m:
            county_code,county,const_code,constituency,ward_code,ward,centre_code,centre,poll_code,poll_name,voters=m.groups()
            rows.append(dict(countyCode=county_code,countyName=county,constituency=constituency,ward=ward,centreCode=centre_code,name=centre,pollingCode=poll_code,pollingName=poll_name,voters=int(voters)))
json.dump(rows,sys.stdout)
