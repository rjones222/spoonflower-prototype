# spoonflower-prototype

The following are steps to setting up a shareable Vagrant box that sets up a basic Apache server to run Foundation for Sites on. The steps are manual currently, they could be scripted in the `bootstrap.sh` file, but that's a future project.

1. Install Vagrant: https://www.vagrantup.com/downloads.html
2. Install VirtualBox: https://www.virtualbox.org/
3. Install Node: https://nodejs.org/en/
4. I created a directory for this called ~/Development (but you could call it whatever you want). Inside that directory run:

$ vagrant init hashicorp/precise64

$ vagrant up

