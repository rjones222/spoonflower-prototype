# spoonflower-prototype

The following are steps to setting up a shareable Vagrant box that sets up a basic Apache server to run Foundation for Sites on. The steps are manual currently, they could be scripted in the `bootstrap.sh` file, but that's a future project.

## Initial Setup

1. Install Vagrant: https://www.vagrantup.com/downloads.html
2. Install VirtualBox: https://www.virtualbox.org/
3. Install Node: https://nodejs.org/en/
4. I created a directory for this called `Prototype` at `~` (but you could call it whatever you want). Inside that directory run:

`$ git clone git@github.com:rjones222/spoonflower-prototype.git`

`$ cd spoonflower-prototype`

`$ vagrant up`

`$ vagrant provision`

You now should have a box you can can `vagrant ssh` into.

## Sharing

In the basic Vagrant setup instructions (at https://www.vagrantup.com/docs/) the parent company HashiCorp provide a free service within its Atlas enterprise suite. We can use this to create a non-production hosting environment for our prototyping work.

1. [Sign up for an Atlas account](https://atlas.hashicorp.com/account/new), you'll need the Atlas username and password that you create in the next steps.

