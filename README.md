# makerpapa-admin


put --skip-ci into commit to skip codeship


To make an keystonejs project delopliable on baidu yun you should:

1, copy the app.conf file into your project root folder.

2, put below code into your package.json, for nodejs lunching in baidu yun:


  "scripts": {
    "start": "node keystone.js"
  },

3, chang node port! (in .env file)

PORT=18080

4, change db link  (in .env file)


5, chang .gitingnore file to remove .env, we will set db link and node port in this file, because we don't how to set env in BAE.

#.env

6, because bae will close mongodb connect after each request, so we need change settings:

   All in keystone.js file , please just follow this.

Once you have changed .env file to link db to BAE's mongodb, you will not able to run this application locally, because BAE's mongodb only accessable on BAE.


to run this website localy you need comment MONGO_URI in .env file.