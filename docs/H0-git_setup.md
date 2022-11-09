The following setup instruction works for macOS and apart from the installation process of git also probably works for most linux distributions, since the commands used are git-specific not macOS specific.

# Local setup
## Installation of git
The easiest way to install git on macOS is by using [_homebrew_](https://brew.sh/index_de) which is a packaging tool for macOS similar to apt-get on debian based systems.
The following line installs git on macOS:

```
brew install git
```

On Linux it is similar using `apt-get`:
```
apt-get git
```

## User settings
To connect the commits done using the git command line it is recommended to also add one's name and email address to the git configs, to later be able to understand which commit was done by whom. 

The username is set using the following command:
```
git config --global user.name "FIRST_NAME LAST_NAME"
```

and the email address:
```
git config --global user.email "MY_NAME@example.com"
```

# Remote Setup
## Github Account.
To use the git remote repository, one needs to [sign up to github](https://www.google.com/search?client=firefox-b-d&q=github+signup) to be able to create a private or public repository. To only clone a public repository by another user, an account is not necessary. 

## Usage of SSH
To connect to the github server in a secure way without the need of HTTPS connections, which require the user to input username and password for every connection, one can [upload an SSH key](https://docs.github.com/es/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) to the github account, which is then used by the git command line tool to connect to the server.

If it's the first time an SSH key is needed it might be necessary to first generate a new one. SSH keys are typically stored in a user's home directory under `~/.ssh` (it is a hidden folder, so might be necessary to activate the displaying of hidden folders in the explorer or finder or using command line `ls -a`)

### Generation of a new key
A new key can be generated using the following line
```
ssh-keygen -t ed25519 -C "your_email@example.com"
```

After this one can find a private key `id_ed25519` and a public key `id_ed25519.pub` can be found in the ssh-directory (`~/.ssh`)

Instead of using the _ed25519_ algorithm to create the key pair it is also possible to use _RSA_ by using 

```
ssh-keygen -t rsa -C "your_email@example.com"
```

Mark that the key files are then named `id_rsa`.

### Adding key to ssh-agent
To make sure the right key is used when establishing a connection to github one can add the following to the ssh config file under `~/.ssh/config` (if this file does not exist, create it)

```
Host *.github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

### Uploading key to github
A key can be added in the user settings under [_SSH and GPG keys_](https://github.com/settings/keys). Mark that you have to upload the public key (the one ending on `.pub`).

## Creating and connecting repository
### Local repository
To create a local repository one simply has to move to the folder that is supposed to be versioned using git and initialize the repository using
```
git init
```

Otherwise one can first create a remote repository and then simply clone it using 
```
git clone <url>
```
which automatically creates the new folder and connects local and remote repository. 

### Remote repository
A remote repository can be created using the github website.



