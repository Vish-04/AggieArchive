from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException
import time
import json

# Set the path to the ChromeDriver executable
webdriver_service = Service(r'vite-super-secret\Backend\Web Scraper\chromedriver.exe')

# Set the options for Chrome WebDriver
chrome_options = Options()
# chrome_options.add_argument('--headless')  # Run Chrome in headless mode (without GUI)

# Initialize the Chrome WebDriver
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)

# Navigate to the UC Davis course catalog website
driver.get('https://catalog.ucdavis.edu/course-search/')

time.sleep(1)

courses = []

# Value options
with open("vite-super-secret\Backend\Web Scraper\data\course_category.json", "r") as f:
    value_options = json.load(f)

# value_options = ["IMM", "IRE", "IST", "ITA", "JPN", "JST", "LAT", "LAW", "LDA", "LIN", "LTS", "MAE", "MAT", "MCB", "MCN", "MCP", "MDS", "MGB", "MGP", "MGT", "MGV", "MHI", "MIB", "MIC", "MMI", "MPM", "MPS", "MSA", "MSC", "MST", "MUS", "NAS", "NEM", "NEP", "NEU", "NGG", "NPB", "NRS", "NSC", "NSU", "NUB", "NUT", "OBG", "OPT", "OSU", "OTO", "PAS", "PBG", "PBI", "PED", "PER", "PFS", "PHA", "PHE", "PHI", "PHR", "PHY", "PLB", "PLP", "PLS", "PMD", "PMI", "PMR", "POL", "POR", "PSC", "PSU", "PSY", "PTX", "PUL", "PUN", "RDI", "REL", "RNU", "RON", "RST", "RUS", "SAF", "SAS", "SOC", "SPA", "SPH", "SSC", "STA", "STH", "STS", "SUR", "TAE", "TCS", "TTP", "TXC", "URO", "UWP", "VEN", "VET", "VMB", "VMD", "VSTN", "WAS", "WFC", "WLD", "WMS"]


# Find the dropdown element
dropdown_element = driver.find_element(By.ID, 'crit-subject')

# Iterate over each option value
for option_value in value_options:
    # Select the option value from the dropdown
    select = Select(dropdown_element)
    select.select_by_value(option_value)
    time.sleep(1)
    
    # Click on the search button
    search_button = driver.find_element(By.ID, 'search-button')
    search_button.click()
    time.sleep(1)

    # Find all the links with class="result__link"
    links = driver.find_elements(By.CLASS_NAME, 'result__link')
    
    # Iterate over each link and click on it
    for link in links:
        try:
            
            # Click on the link
            link.click()
            time.sleep(.2)


            
            course_id_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'span.text.courseblockdetail.detail-code.margin--span.text--semibold.text--big')))
            course_id = course_id_element.text
            print("COURSE ID: " + course_id)
            time.sleep(.2)


            course_name_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR,  'span.text.courseblockdetail.detail-title.margin--span.text--semibold.text--big')))
            course_name = course_name_element.text
            print("COURSE NAME: " + course_name)
            time.sleep(.2)

            course_units_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'span.text.courseblockdetail.detail-hours_html.margin--span.text--semibold.text--big')))
            course_units = course_units_element.text
            print("COURSE UNITS: " + course_units)
            time.sleep(.2)
            
            # Extract text from the <div> element
            course_description_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.section.section--description')))
            course_description = course_description_element.text
            print("COURSE DESCRIPTION: " + course_description)
            time.sleep(.2)

            try:
                course_details_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.section.section--coursedetails')))
                course_details = course_details_element.text
                time.sleep(.2)

                course = {
                "course_id": course_id, 
                "course_name": course_name, 
                "course_units": course_units, 
                "course_description": course_description, 
                "course_details": course_details, 
                }
            except Exception as e:
                print("ITS ALL FAILINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")


            
            try: 
                course_details_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.section.section--coursedetails')))
                course_details = course_details_element.text
                print("COURSE DETAILS: " + course_details)
                time.sleep(.2)

                course = {
                "course_id": course_id, 
                "course_name": course_name, 
                "course_units": course_units, 
                "course_description": course_description, 
                "course_details": course_details, 
            }

            except StaleElementReferenceException:
                course = {
                "course_id": course_id, 
                "course_name": course_name, 
                "course_units": course_units, 
                "course_description": course_description, 
                # "course_details": course_details, 
             }


            print(course)
            courses.append(course)
            time.sleep(.2)
            print("PASSED")
        
        except Exception as e:
            print("IN ERROR")
            print(f"Error: {str(e)}")

print(courses)
with open("vite-super-secret\Backend\Web Scraper\data\course.json", "w") as f:
    json.dump(courses, f)

# Close the browser window
driver.quit()
