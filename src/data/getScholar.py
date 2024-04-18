import requests
import json
import os
import time

from scholarly import scholarly
from scholarly import ProxyGenerator

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
    pg = ProxyGenerator()
    pg.FreeProxies()
    scholarly.use_proxy(pg)

    res = []
    if os.path.isfile("scholar.txt") == False:
        search_query = scholarly.search_author('Tarik Crnovrsanin')
        res = scholarly.fill(next(search_query))
        # with open("scholar.txt", "w") as file:
        #     json.dump(res, file)
    else :
        with open("scholar.txt", "r") as file:
            res = json.loads(file)
    
    cite = {}
    for pub in res['publications']:
        name = pub['bib']['title']
        cite[name] = {name:name, "count":0, "citeYears":[]}
        time.sleep(30)
        for citation in scholarly.citedby(pub):
            time.sleep(5)
            try:
                cite[name]['count'] += 1
                if 'pub_year' in citation['bib']:
                    cite[name]["citeYears"].append(citation['bib']['pub_year'])
            except:
                print("Doesn't work:", citation)
    with open("cite-save.json", "w") as file:
            json.dump(cite, file)


    # data = []
    # with open('portfolio.json', "r") as json_file:
    #     data = json.load(json_file)
    
    # cite = []
    # for entry in data['publications']['journal']:
    #     if('DOI' in entry['materials'] and entry['materials']['DOI'] != ''):
    #         generateMetaData(entry, entry['materials']['DOI'], cite)
    #     else:
    #         print("DOI is missing: ", entry['title'])
    #         paper = {}
    #         paper['citeCount'] = {}
    #         paper['title'] = entry['title']
    #         paper['link'] = entry["hashLink"]
    #         cite.append(paper)
    # for entry in data['publications']['conference']:
    #     if('DOI' in entry['materials'] and entry['materials']['DOI'] != ''):
    #         generateMetaData(entry, entry['materials']['DOI'], cite)
    #     else:
    #         print("DOI is missing: ", entry['title'])
    #         paper = {}
    #         paper['citeCount'] = {}
    #         paper['title'] = entry['title']
    #         paper['total'] = 0
    #         paper['link'] = entry["hashLink"]
    #         cite.append(paper)
    # with open('citations.json', 'w', encoding='utf-8') as f:
    #   json.dump(cite, f, indent=4)
if __name__ == "__main__":
    main()