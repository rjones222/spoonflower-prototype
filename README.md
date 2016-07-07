# spoonflower-prototype

The following are steps to setting up a shareable Vagrant box that sets up a basic Apache server to run Foundation for Sites on. The steps are manual currently, they could be scripted in the `bootstrap.sh` file, but that's a future project. Much of the text below has been lifted from (https://www.vagrantup.com/docs/getting-started/).

## Initial Setup

1. Install Vagrant: https://www.vagrantup.com/downloads.html
2. Install VirtualBox: https://www.virtualbox.org/
3. Install Node: https://nodejs.org/en/
4. I created a directory for this called `Prototype` at `~` (but you could call it whatever you want). Inside that directory run:
5. `git clone git@github.com:rjones222/spoonflower-prototype.git`
6. `cd spoonflower-prototype`
7. `vagrant up`
8. `vagrant provision`

You now should have a box you can can `vagrant ssh` into.

## Sharing

In the basic Vagrant setup instructions (at https://www.vagrantup.com/docs/) the parent company HashiCorp provide a free service within its Atlas enterprise suite. We can use this to create a non-production hosting environment for our prototyping work.

1. [Sign up for an Atlas account](https://atlas.hashicorp.com/account/new), you'll need the Atlas username and password that you create in the next steps.
2. `vagrant login`
3. Once you are logged in, run vagrant share:

`vagrant share`

```
==> default: Your Vagrant Share is running!
==> default: URL: http://frosty-weasel-0857.vagrantshare.com
```

Your URL will be different, so do not try the URL above. Instead, copy the URL that vagrant share outputted for you and visit that in a web browser. It should load the Apache page we setup earlier.

## Create the Foundation for Sites scaffold
[[from Zurb's Docs](http://foundation.zurb.com/sites/docs/installation.html)]

The Node-powered Foundation CLI can install the same template projects for you. Install it with npm:

`npm install --global foundation-cli`

Depending on how your machine is configured, the command may fail with an `EACCESS` error. To get around this, run the command with sudo at the beginning:

`sudo npm install --global foundation-cli`

Once you've installed the CLI, use the new command to start making a new project:

`foundation new`
