# emm

## How to work on the repo yourself

1. run the following command in your terminal in the directory where you want the project to be stored:
   `git clone https://github.com/DanielCraciunGitHub/emm.git`

2. run `npm install` in order to download all of the dependencies.

3. run `git pull origin master` before working on your code to sync with the remote repository

4. run `git branch (your-branch-name)` to create a branch, followed by `git checkout (your-branch-name)` to enter your
   branch environment

5. Whenever you add/edit/delete files, run `git status` which gives you a breakdown of the changes you made, followed by
   running `git add .` to add all of your changes to a staging area.

6. Once you are happy with your changes, run ```git commit -m "(write-a-message-here)" to commit your changes (sort of
   like a checkpoint)

7. Finally you can push the changes to the remote using `git push origin (your-branch-name)` where it can be reviewed
   and actually be implemented into the website.
