import requests
import json

def get_citations(doi):
    base_url = "https://opencitations.net/index/coci/api/v1/citations/"
    url = f"{base_url}{doi}"
    # print(url)
    response = requests.get(url)
    if response.status_code == 200:
        citations = response.json()
        return citations
    else:
        print(f"Failed to retrieve citations. Status code: {response.status_code}")
        return None

def generateMetaData(entry, doi:str, cite):
    doi = doi.split("doi.org/")[1]
    citations = get_citations(doi)
    
    if citations:
        paper = {}
        paper['citeCount'] = {}
        paper['title'] = entry['title']
        paper['link'] = entry["hashLink"]
        paper['total'] = len(citations)
        for citation in citations:
            year = citation['creation'].split("-")[0]
            paper['citeCount'][year] = paper['citeCount'].get(year, 0) + 1
        cite.append(paper)


def main():
    # Replace 'YOUR_PAPER_DOI' with the actual DOI of the paper you want to get citations for
    data = []
    with open('portfolio.json', "r") as json_file:
        data = json.load(json_file)
    
    cite = []
    for entry in data['publications']['journal']:
        if('DOI' in entry['materials'] and entry['materials']['DOI'] != ''):
            generateMetaData(entry, entry['materials']['DOI'], cite)
        else:
            print("DOI is missing: ", entry['title'])
            paper = {}
            paper['citeCount'] = {}
            paper['title'] = entry['title']
            paper['link'] = entry["hashLink"]
            cite.append(paper)
    for entry in data['publications']['conference']:
        if('DOI' in entry['materials'] and entry['materials']['DOI'] != ''):
            generateMetaData(entry, entry['materials']['DOI'], cite)
        else:
            print("DOI is missing: ", entry['title'])
            paper = {}
            paper['citeCount'] = {}
            paper['title'] = entry['title']
            paper['total'] = 0
            paper['link'] = entry["hashLink"]
            cite.append(paper)
    with open('citations.json', 'w', encoding='utf-8') as f:
      json.dump(cite, f, indent=4)
if __name__ == "__main__":
    main()