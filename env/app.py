from flask import Flask, render_template, send_from_directory, Response
import requests
import json
import os

app = Flask(__name__, static_url_path='', static_folder='./')

@app.route("/api/all/", methods=['GET'])
def getAll():
  people = requests.get('https://swapi.dev/api/people').content
  people = json.loads(people.decode("utf-8"))
  ppl = people['results']
  fetchmore = people['next']
  while fetchmore:
    morepeople = requests.get(fetchmore).content
    morepeople = json.loads(morepeople.decode("utf-8"))
    ppl += (morepeople['results'])
    fetchmore = morepeople['next']
  planets = allPlanets()
  output = []
  for person in ppl:
    pers = {}
    pers['name'] = person['name'] if 'name' in person else ''
    pers['homeworld'] = [world['name'] for world in planets if 'url' in world and 'name' in world and world['url'] == person['homeworld']] if 'homeworld' in person else ''
    output.append(pers)
  res = json.dumps(output)
  return Response(res, status=200, content_type=json)

@app.route('/api/planets/', methods=['GET'])
def getPlanets():
  planets = allPlanets()
  planets = json.dumps(planets)
  return Response(planets, status=200, content_type=json)

def allPlanets():
  planets = requests.get('https://swapi.dev/api/planets').content
  planets = json.loads(planets.decode("utf-8"))
  fetchmore = planets['next']
  planets = planets['results']
  while fetchmore:
    moreplanets = requests.get(fetchmore).content
    moreplanets = json.loads(moreplanets.decode("utf-8"))
    planets += (moreplanets['results'])
    fetchmore = moreplanets['next']
  return planets

@app.route("/")
def serve():
    sp = os.path.join(app.root_path, 'client') 
    return send_from_directory(sp, 'index.html')

def index():
  return render_template('index.html')

if __name__ == "__main__":
  app.run(host="localhost", port=5001, debug=True)