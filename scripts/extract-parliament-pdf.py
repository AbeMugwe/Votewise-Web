import json, sys, pdfplumber
rows=[]
with pdfplumber.open(sys.argv[1]) as pdf:
    for page in pdf.pages:
        for table in page.extract_tables():
            for row in table:
                if len(row) == 4 and (row[0] or "").strip().rstrip(".").isdigit():
                    rows.append({"number": int(row[0].strip().rstrip(".")), "rawName": (row[1] or "").strip(), "seat": (row[2] or "").strip(), "party": (row[3] or "").strip()})
# Page 2's first six rows have a broken table boundary in the source PDF.
rows += [
    {"number": 40, "rawName": "Waweru, Sammy Douglas Kamau", "seat": "Ol Kalou", "party": "DCP"},
    {"number": 41, "rawName": "Korere, Sarah Paulata", "seat": "Laikipia North", "party": "JP"},
    {"number": 42, "rawName": "Koyi, John Waluke", "seat": "Sirisia", "party": "JP"},
    {"number": 43, "rawName": "Kwenya, Thuku Zachary", "seat": "Kinangop", "party": "JP"},
    {"number": 44, "rawName": "Lomwa, Joseph Samal", "seat": "Isiolo North", "party": "JP"},
    {"number": 45, "rawName": "Maina, Mwago Amos", "seat": "Starehe", "party": "JP"},
]
rows.sort(key=lambda row: row["number"])
json.dump(rows, sys.stdout)
