## TO RUN THE APP

1. Before running the application, **docker** and **docker-compose** should be installed in your system.
2. `chmod +x buildProject.sh && ./buildProject.sh` - builds the UI and runs the docker containers
3. If not previously run before, go to localhost:3030, create the dataset **resume** and add the 3 rdf files in the *Ontologies folder* (countries.ttl, resume2rdf_ontology.ttl, resume2rdf_value_ontology.ttl) Credentials are:  username: **admin** pass: **pw123**
4. App is running on **localhost:5000**

**HINT**
You can use the sampleUploadFile.json for playing around with the features of the app.

## Ontology

The Ontology used as a base for our web app is located in the Ontologies directory. 
**Main Ontology: resume2rdf_ontology.ttl**
**Value Ontology: resume2rdf_value_ontology.ttl**

## Working on the frontend part

In the project UI directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### to build it 

You will need to run:

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

And then you need to run the python server to fully use the application (in Docker *app.py*)