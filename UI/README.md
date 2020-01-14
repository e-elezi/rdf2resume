## Prerequisite

Before running the application, all the ontolgies in the **Ontologies** folder need to be uploaded in a Triple store endpoint.
By default currently, the app points toward an endpoint at **localhost:3030/resume**.

Please have **Node**, **NPM**, **Python3**, **Pip3** installed and the following python libraries **flask**, **flask_cors**, **SPARQLWrapper**.

At the moment the icons use are from fontawesome during the generation of the pdf. And to use them, you need to install fontawesome icons via
`sudo apt install texlive-fonts-extra`. This approach takes a lot of memory to install the fonts/icons and will be reconsidered during further development.

## Working on the frontend part

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Working on frontend + backend

You will need to build the frontend files by:

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

And then you need to run the python server to fully use the application by:

### `python3 server.py`