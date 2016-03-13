### gifingerprints

This repo will contain the application for submission to georgwetown's media fest.

### data folder

`output.txt` contains the raw data taken from dynamodb. ipython notebook in `data/` directory has initial exploration along with the code to clean up the raw stuff. `data/cleaned_trends.json` has cleaned up data for experimentation.

### TODO

- [ ] flask app for front end:
  - [ ] routing
  - [ ] api
  - [ ] d3
- [ ] AWS lambda for getting twitter trends and downloading gifs
  - [ ] Lambda -> S3 via boto3 for downloading and storing gifs
  - [x] Lambda -> dynamodb stores twitter trends information
- [ ] deploy on elasticbeanstalk
