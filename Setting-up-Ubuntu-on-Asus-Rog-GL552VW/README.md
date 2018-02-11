# Setting up Ubuntu on Asus Rog GL552VW

_Author: **[Vatsal Joshi](https://vatz88.in)**_ 

_Date: **10th March 2017**_

---

If you are new to Linux probably switching from Windows, getting Linux up and running on your system can be tiresome.
Here, I have tried to list down the problems I faced while setting up my system along with their solutions. Also, I have added some extra things you might want to do as a developer.
In the end I have added some useful Linux commands which will be helpful to you if you are a first time Linux user.
I will be more specific towards the issues which may arise while installing and skip the common steps which you can find from a google search. I have Asus Rog GL552VW which comes with Nvidia graphics card and Windows installed.

### Installing Ubuntu

**Issue:** Ubuntu stuck while booting

This problem arises due the Nvidia graphics.

**Solution:**

- Reboot into GRUB.</li>
- Highlight the Ubuntu option and press `E`.
- Add `nouveau.modeset=0` to the end of the line beginning with Linux.
- Press F10 to boot.

This is just a temporary work around. After the installation make sure you do the following:

1. Open the GRUB file.

    sudo gedit /etc/default/grub

2. Find the following command

        GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"

    And change it to

        GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nouveau.modeset=0"

3. Save and go back to terminal and run:

        sudo update-grub

4. Finally reboot your system.

_Reference:_ [askUbuntu.com/questions/760934/graphics-issues-after-while-installing-Ubuntu-16-04-16-10-with-nvidia-graphics](http://askUbuntu.com/questions/760934/graphics-issues-after-while-installing-Ubuntu-16-04-16-10-with-nvidia-graphics)

### Chrome Flickering

**Issue:** Some pages with heavy animations when opened in chrome, screen starts flickering.

**Solution:**

1. Open the following file to edit

        sudo gedit /usr/share/applications/google-chrome.desktop

2. Find and change the line

        Exec=/usr/bin/google-chrome-stable %U

    to

        Exec=/usr/bin/google-chrome-stable %U "--disable-gpu-driver-bug-workarounds" "--enable-native-gpu-memory-buffers"

_Note that you'll have to do this each time after chrome is updated._

## Extra Setup For Developers

### Install JDK

    sudo apt-get install default-jdk

### Set up LAMP

- Install Apache Server

        sudo apt-get install apache2

- Install MySQL Server

        sudo apt-get install mysql-server

- Install PHP

        sudo apt-get install php7.0-cli
        sudo apt-get install libapache2-mod-php
        sudo apt-get install php-mysql

Above commands will Install LAMP. Once you're done with that, following are some addition tools and useful commands:

- Restart Apache Server

        sudo /etc/init.d/apache2 restart

- Open mysql in terminal

        mysql -u root -p

- Deploy Adminer On Localhost

        sudo apt-get install adminer
        sudo wget "http://www.adminer.org/latest.php" -O /usr/share/adminer/latest.php
        sudo ln -s /usr/share/adminer/latest.php /usr/share/adminer/adminer.php
        echo "Alias /adminer.php /usr/share/adminer/adminer.php" | sudo tee /etc/apache2/conf-available/adminer.conf
        sudo a2enconf adminer.conf //access here: http://localhost/adminer.php

Additionally, if you would like to install postgresql follow the Stack Overflow answer bellow.

*Reference:* [stackoverflow.com/questions/1471571/how-to-configure-postgresql-for-the-first-time](https://stackoverflow.com/questions/1471571/how-to-configure-postgresql-for-the-first-time)

## Useful Linux Commands And Tricks For Newbies

### Upadte System

Update everything with this single command

    sudo apt-get update && time sudo apt-get dist-upgrade

### Show Password Feedback In Terminal

    sudo gedit /etc/sudoers

Find the following line in the file opened

    Defaults env_reset

And replace it with

    Defaults env_reset,pwfeedback

### Install A Package

sudo apt-get install [packagename]

### Completely Uninstall A Package

    sudo apt-get remove --purge [packagename]
    sudo apt-get autoremove
    sudo aptitude purge [packagename]

### Reinstall a Installed Package

    sudo apt-get update && sudo apt-get install --reinstall [packagename]

### Open File Browser As Super User

    sudo apt install gksu
    gksu nautilus

### Automatically Mount Partitions

If you have more than one hard drive partitions on your system Ubuntu will only mount the one on which it is installed. Other partitions will mount as you try to open them. This gives some lag when you open the unmounted drive for the first time.

You may refer the following Stack Overflow link to mount partitions automatically on startup.

_Reference:_ [stackoverflow.com/questions/1471571/how-to-configure-postgresql-for-the-first-time](https://stackoverflow.com/questions/1471571/how-to-configure-postgresql-for-the-first-time)
