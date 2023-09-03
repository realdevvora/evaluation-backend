from selenium import webdriver
from bs4 import BeautifulSoup
import json

driver = webdriver.Chrome()

data = []

pages = int(input("Enter the number of pages there are: "))

for x in range(0, pages):

    url = f'https://utm.calendar.utoronto.ca/course-search?page={x}'

    driver.get(url)

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    courses = soup.find_all("div", class_="views-row")

    for course in courses:
        dct = {}
        course_name = course.find("h3", class_="js-views-accordion-group-header")
        course_difficulty = 0
        course_dst = course.find("span", class_="views-field views-field-field-distribution-requirements")

        if course_name is not None:
            course_name = course_name.text.strip()
        else:
            course_name = "N/A"
        if course_dst is not None:
            course_dst = course_dst.text.strip()
        else:
            course_dst = "N/A"

        dct["title"] = course_name
        dct["distribution"] = course_dst
        dct["difficulty"] = course_difficulty

        data.append(dct)

for i in data:
    if i["title"] == "N/A":
        data.remove(i)

course_data = open("course_data.json", "w")
json.dump(data, course_data, indent=6)

course_data.close()

driver.quit()