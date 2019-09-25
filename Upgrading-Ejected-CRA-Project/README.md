# Upgrading Ejected CRA Project

_Author: **[Vatsal Joshi](https://vatz88.in)**_

_Date: **10th September 2019**_

---

I recently upgraded a react app with significantly large code base and already running in production which was created using [CRA](https://facebook.github.io/create-react-app/) and had [Webpack](https://webpack.js.org) [ejected](https://create-react-app.dev/docs/available-scripts#npm-run-eject). The goal was to upgrade [React](https://reactjs.org/) from v15 to v16, Webpack from v3 to v4, [Babel](https://babeljs.io/) from v6 to v7 and all the related loader / plugin and dependencies to their latest versions. In addition to that, the project had a significant portion of code written in `coffee` and `cjsx` which was to be removed as it's no more a good idea to keep using [CoffeeScript](https://coffeescript.org).

I'll share some of my learnings and approaches here.

## Explore Alternatives To Ejecting CRA

Ejecting webpack does give a lot of customizing power, but do consider other approaches before ejecting. Since upgrading ejected app is quite a task, of manually keeping check of latest version of packages and their compatibility with versions of React and Webpack. Consider reading [alternatives to ejecting](https://facebook.github.io/create-react-app/docs/alternatives-to-ejecting).

## Approaches To Upgrading Ejected CRA

### Update Packages Manually

I did try updating individual packages and it worked to an extent.

Basic approach should be:

1. Read the changelog for the particular package.

2. Follow the migration doc if present.

3. Identify and upgrade the plugins and loaders or the related config change.

This did work well for upgrading Babel and Webpack. For upgrading their plugins and loaders, I checked their respective repos on github for any changelog or deprecation notice. For example, the Webpack's `ExtractTextPlugin` is deprecated and you should instead use `MiniCssExtractPlugin`.

The problem with this approach is that webpack config will also need to be updated, not just for webpack changelog but also for upgrade or deprecation changes in plugins / loaders. Writing a perfect webpack config is not easy, unless you're a pro at it. For some reason I find webpack a little tricky, because sheer knowledge of javascript just does not help. You'll have to dive into its documentation and know some of the internals of webpack. For example, the webpack 4 has a new key in their config called `mode`. When `mode` is set to `production` you no more need to use the `UglifyJsPlugin`.

### Copy From The Latest CRA Eject

This approach is more foolproof. Create a new project from CRA and eject it. Copy the webpack config and related files and also `start` and `build` script files. Basically, everything you see in `config` and `scripts` folder. Now, compare and update the packages' versions, remove unused packages and add new ones if required.

You should still read and go through the changelog of Babel and especially Webpack. It'll help you understand the changes in the config file. This approach also automatically adds new CRA features like support for typescript and other optimizations in the webpack config.

## Potential Issues You May Face

After you follow the upgrade procedure and run `npm start` or `yarn start`, the start script will probably fail the first time. Try to identify the issue, fix it and keep repeating it unless you get the dev server running.

### Dev Build Works, Production Does Not

This may happen, since there are different configs for both. As a first hack, pass 'development' to `configFactory` in build script. To better identify if the issue is with the production config.

`Babel` has some significant changes from version 6 to 7. Try changing `BABEL_ENV = 'development'` in the build script. I did the trick for me.

Few issues I faced were:

- **Production mode JavaScript bundle execution fails.** It was mainly because the latest CRA uses `TerserPlugin` with options set for best optimizations. I had to modify a few options and add some additional options to override the defaults. If you have eslint enabled in your webpack config in your project which is suppose to ensure code quality, you may not face this issue.

- **Styles did not load properly.** The development build uses `style-loader` which would bundle CSS along with JavaScript. Also, better for HOT reloading. But the production build uses `MiniCssExtractPlugin` which will, as the name suggests extract the CSS and make a separate bundle for CSS. It's better for production build as CSS bundles can be cached by browser separately and also makes loading styles faster and doesn't depend on Javascript bundle to execute. Apparently, the plugin which was used in the older versions, `ExtractTextPlugin` did work as expected with the existing code but, with `MiniCssExtractPlugin` had to do certain refactoring in the LESS files.

## Moving LESS to SASS

The project I was upgrading is using LESS and it's no more a good idea to use LESS. SASS is better in a lot of terms. Refer this article to know more on why you should use SASS over LESS [sass-vs-less](https://css-tricks.com/sass-vs-less/). I did try to convert my LESS files to SASS and there are npm packages which do that. But it's not 100% compatible conversion. I later decided not to go ahead with it and let LESS remain there for now. Any new CSS should be written in SASS and LESS can be gradually removed over time.

## Upgrading React

If you get rest of the things working, this is the easiest step. React codemods make it even easier. Just go through the [official react migration doc](https://reactjs.org/blog/2017/09/26/react-v16.0.html#upgrading).

### Migrating CoffeeScript

In my case running react codemods was not that simple. I had to first convert all CoffeeScript files, both `.coffee` and `.cjsx` to `.js` and `.jsx`.

NPM packages [decaffeinate](https://github.com/decaffeinate/decaffeinate) and [depercolator](https://github.com/bugsnag/depercolator) are amazing, converting literally all of `.coffee` and `.cjsx` to `.js` and `.jsx` respectively. There were some issues in converting, but these cli commands come with options, like I had to use `--disable-babel-constructor-workaround` and then fix the error manually in some of the files.

Hope you found this information helpful. There's much more to this whole upgrading process but I guess I have covered everything in simplest possible way. Drop in a comment if you'd like to know more.
