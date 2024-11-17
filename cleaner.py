import os
import xml.etree.ElementTree as ET
import pandas as pd
# this is the path to the XML files
path = 'xmls'
# we use the os library to encode the path
folder = os.fsencode(path)
#here we get a list of XML files in the directory
filenames = [os.fsdecode(file) for file in os.listdir(folder)\
             if os.fsdecode(file).endswith(".xml")]
filenames
output:['leightonCS18.xml', 'leightonCS19.xml']
#create an empty list for the text
lecture_texts = []
#iterate over the list of file names
for file in filenames:
    tree = ET.parse('xmls/{}'.format(file))
    root = tree.getroot()
    subtitles = []
    #extract the text
    for element in root:  
        for subelement in element:
            subtitles.append(subelement.text)
    lecture_texts.append(subtitles)
#Check the output
lecture_texts[0][:3]
output: ['The following content is\nprovided under a Creative',
 'Commons license.',
 'Your support will help\nMIT OpenCourseWare']

lecture_df = pd.DataFrame({'filename':filenames,
         'text':[''.join(lecture) for lecture in lecture_texts]})
lecture_df.head()
output: