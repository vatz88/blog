# Upgrading Ejected CRA Project

_Author: **[Vatsal Joshi](https://vatz88.in)**_

_Date: **4th August 2019**_

---

I recently upgraded a very large project which was created using [CRA](https://facebook.github.io/create-react-app/) and had webpack ejected. The goal was to upgrade react, webpack, babel and all the related loader / plugin and dependencies to their latest versions. In addition to that, the project had a significant portion of code written in `coffee` and `cjsx` which was to be removed as it's no more a good idea to keep using coffeescript.

In the entire process I have found out that ejecting webpack does give a lot of customizing power, but do consider other approaches before going with ejected. Since upgrading ejected app is quite a task, manually keeping check of latest version packages and the compatibility with webpack is a lot of work. Consider reading [alternatives to ejecting](https://facebook.github.io/create-react-app/docs/alternatives-to-ejecting).
