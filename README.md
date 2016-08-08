# spoonflower-prototype

The following are steps to setting up using a Yeoman generator called [generator-webapp](https://github.com/yeoman/generator-webapp). 

## Setup

1. Install Node: https://nodejs.org/en/
2. `git clone git@github.com:rjones222/spoonflower-prototype.git`
3. `cd spoonflower-prototype/project-nav/`
4. `npm install` note: you'll get some deprecated packages warnings but it should still install
5. `bower install`

## Run

When you run `gulp serve` you'll see something like this:

```
Access URLs:
 -------------------------------------
       Local: http://localhost:9000
    External: http://172.16.7.215:9000
 -------------------------------------
          UI: http://localhost:3001
 UI External: http://172.16.7.215:3001
 ```
 
 External URLs are served up using Browsersync.io


