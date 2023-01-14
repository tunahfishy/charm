from collections import namedtuple
import numpy as np
import json
import os
import traceback
from tqdm import tqdm
import numpy as np
import openai
from openai.embeddings_utils import get_embedding
import faiss
from dotenv import load_dotenv

load_dotenv()
print(os.environ["OPENAI_SECRET_KEY"])
openai.api_key = os.environ['OPENAI_SECRET_KEY']


Engine = namedtuple('Engine', ['index', 'data'])


def init_engine(embeddings_dir):
    # go through all the files in the embeddings directory that end in .json
    # embeddings_files = [embeddings_dir + x for x in os.listdir(embeddings_dir) if x.endswith('.json')]
    # print('Found {} embedding files'.format(len(embeddings_files)))

    # # load all the embeddings into a list
    # all_data = []
    # for file in tqdm(embeddings_files[:10]):
    #     print('Loading file {}'.format(file))
    #     with open(file, 'r') as f:
    #         all_data.extend(json.load(f))
    # print('Loaded {} embeddings'.format(len(all_data)))

    with open(embeddings_dir, "rb") as f:
        all_bios = json.load(f)

    # generate a dense numpy array of all the embeddings
    # all_bios = [{"name": name, "bio": bio, "embeddings": []}, {"name":name, "bio": bio, "embeddings": []}}
    all_embeddings = np.array([x['embedding'] for x in all_bios])
    all_embeddings /= np.linalg.norm(all_embeddings, axis=1, keepdims=True)
    print('Normalized {} embeddings'.format(all_embeddings.shape))
    index = faiss.IndexFlatIP(all_embeddings.shape[1])
    index.add(all_embeddings)

    for x in all_bios:
        # we don't need this anymore. (i think we can keep this for now)
        del x['embedding']

    return Engine(index, all_bios)

# Engine should be one of "query", "doc"


def query_knn(engine, query, query_type='query', k=5):
    try:
        query_engine = 'text-search-ada-{}-001'.format(query_type)
        embedding = get_embedding(query, engine=query_engine)
    except:
        print(traceback.format_exc())
        print('Couldn\'t get embedding for query: {}'.format(query))
    embedding /= np.linalg.norm(embedding)
    print(embedding.shape)
    D, I = engine.index.search(np.array([embedding]), k)
    return D, [engine.data[i]["name"] for i in I[0]]


engine = init_engine("embeddingsBios.json")
# query = "who is the best CTO for my potential startup idea?"
query = "Who at MIT is best at Machine Learning?"
D, I = query_knn(engine, query)
print(D, str(I))
