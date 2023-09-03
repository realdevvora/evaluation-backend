from selenium import webdriver
from bs4 import BeautifulSoup
import json

driver = webdriver.Chrome()

data = []

pages = int(input("Enter the number of pages there are: "))

for x in range(0, pages):

    url = f'https://utm.calendar.utoronto.ca/program-search?page={x}'

    driver.get(url)

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    courses = soup.find_all("div", class_="views-row")

    for program in courses:
        dct = {}
        program_name = program.find("h3", class_="js-views-accordion-group-header")
        program_desc = program.find("div", class_="views-field views-field-body")

        if program_name is not None:
            program_name = program_name.text.strip()
        else:
            program_name = "N/A"
        if program_desc is not None:
            program_desc = program_desc.text.strip()
        else:
            program_desc = "N/A"

        dct["Program Name"] = program_name
        dct["Program Description"] = program_desc

        data.append(dct)

for i in data:
    if i["Program Name"] == "N/A":
        data.remove(i)

course_data = open("program_data.json", "w")
json.dump(data, course_data, indent=6)

course_data.close()

driver.quit()