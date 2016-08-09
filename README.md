# spoonflower-prototype

The following are steps to setting up using a Yeoman generator called [generator-webapp](https://github.com/yeoman/generator-webapp). 

## Setup

1. Install Node via nvm. On your mac, uninstall any version of node you currently have installed, and instead use nvm (Node Version Manager). Instructions are on the GitHub page. Then use it to install a recent version of
node, such as the 6.2.0 branch ( nvm	install	v6.2.0;	nvm	use	6.2.0 ).)
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


