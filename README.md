### gifingerprints

This repo will contain the application for submission to georgwetown's media fest.

### TODO

- [ ] flask app for front end:
  - [ ] routing
  - [ ] api
  - [ ] d3
- [ ] AWS lambda for getting twitter trends and downloading gifs
  - [ ] Lambda -> S3 via boto3 for downloading and storing gifs
  - [ ] Lambda -> RDS (postgres) stores twitter trends information
- [ ] deploy on elasticbeanstalk
