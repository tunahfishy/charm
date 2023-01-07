from math import ceil
import json, os, pickle
from glob import glob
from openai.embeddings_utils import get_embedding
from pprint import pprint
import openai

# with open('python/data/names.json', 'r') as f: # replace with SQL. all of their information
#     all_bios = json.load(f)

all_bios = { #allow them to put in their own data as well
"Anubhav Bhardwaj": {"bio": "Java Full Stack Developer"},
"mayur chanpa": {"bio":"Tax Associate 2 at Vialto Partners"},
"Jay Bhadury": {"bio":"Production Engineer at Reliance Industries Limited"},
"tinah": {"bio":"Quality Assurance Analyst at Hayat Kimya Nigeria"},
"boyd": {"bio":"Experienced customer service officer and a skilled virtual assistant . i can help you set up your payment gateway on selar and also help with settling up of paypal account."},
"caine": {"bio":"Sql|Python|PowerBi|Azure"},
"surya": {"bio":"Student at Arya Institute of Engineering & Technology, Jaipur-2023"},
"adarsh": {"bio":"Test Lead at TCS and Automation Trainer"},
"hi": {"bio":"MBA in Marketing from “Osmania University ” worked as a Customer Support Professional for 11 Months in Sitel. Ex Sitel."},
"micky": {"bio":"Software Test Engineer Trainee at QSpiders - Software Testing Training Institute"},
"woah": {"bio":"web developer, Web designer"}
}

all_bios_list = []
for k, v in all_bios.items():
    all_bios_list.append(v)
    all_bios_list[-1]["name"] = k

# This code generates the embeddings and then converts it to a pkl to be able
# to work with the embeddings without spending money

openai.api_key = "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"
counter = 0
for bio in all_bios_list:
    if len(bio["bio"]) < 3:
        continue
    bio['embedding'] = get_embedding(bio['bio'], engine='text-search-ada-doc-001')
    counter += 1

# Pickle the output of the embeddings so we don't waste money
with open("embeddings.pkl", "wb") as f:
    pickle.dump(all_bios_list,f)
    print("Written")

# with open("embeddings.pkl", "rb") as f:
#     all_bios = pickle.loads(f)

# print(all_bios)

with open('embeddings.json', 'w') as f:
    #json.dump(f, indent=2, fp=all_bios)
    json.dump(all_bios_list, f, indent=2)



# # JSON batch size
# batch_size = 100 # 100 names per file.

# num_files = ceil(len(all_bios) / batch_size)

# for i in range(num_files):
#     print('Starting batch {} of {}'.format(i+1, num_files))
#     # first check if the batch has already been done!
#     if os.path.exists('python/embeddings/{}.json'.format(i)):
#         print('Batch {} already done!'.format(i+1))
#         continue
#     batch = all_bios[i*batch_size:(i+1)*batch_size]
#     for name in batch:
#         try:
#             if len(name['bio']) > 5000:
#                 raise Exception('bio too short')
#             print('Running embedding for path {}, length {}'.format(name['filepath'], len(name['code'])))
#             name['embedding'] = get_embedding(name['code'], engine='code-search-babbage-code-001')
#             if len(name['bio']) < 3:
#                 raise Exception('bio too short')
#         except Exception as e:
#             print(e)
#             print("Error with name:", name['name'])
#             print('name was of length {}'.format(len(name['code'])))
#             name['embedding'] = [0]*2048
#             print('----------------------------------------')
    # with open('python/embeddings/{}.json'.format(i), 'w') as f:
    #     json.dump(batch, f, indent=2)