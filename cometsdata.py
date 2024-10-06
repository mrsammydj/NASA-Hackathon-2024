import json

with open('cometsdata.json', 'r') as file:
    data = json.load(file)

new_data = []

for i in data:
    sma = (float(i['q_au_2']) + float(i['q_au_1']))/2
    new_data.append({
        "type": "comet",
        "name": i['object_name'],
        "description": "",
        "tail": False,
        "rotationPeriod": 0,
        "sma": sma, 
        "eccentricity": float(i['e']), 
        "inclination": float(i['i_deg']), 
        "raan": float(i['node_deg']), 
        "argPerihelion": float(i['w_deg']), 
        "orbitPeriod": 365*float(i['p_yr'])
    })
    
with open('newdata.json', 'w') as f:
    json.dump(new_data, f)