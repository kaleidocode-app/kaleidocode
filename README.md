<div align="center">
    
<img align="center" width="50%" src="https://user-images.githubusercontent.com/35271042/62098637-0f8c1300-b240-11e9-8fbc-f196a13ffc70.png">
<hr>
A Figma plugin that allows you to convert VS Code themes to Figma color libraries, swap and relink themes, and create new VS Code themes from scratch

<img src="https://user-images.githubusercontent.com/35271042/62098874-19fadc80-b241-11e9-991d-24ff84b9b06a.png" />
    
</div>

# Features

## Generate Themes
Create color guides and color styles based off of a selection of pre-loaded VS Code color themes (Default Dark, Default Light, Ayu Light, Dracula, and Nord).

![generate themes](https://user-images.githubusercontent.com/35271042/62099022-8e358000-b241-11e9-83b5-5cb4e304698b.gif)

## Swap Themes
Easily swap components between color themes and relink color styles if they have become detached.

![swap themes](https://user-images.githubusercontent.com/35271042/62098993-74943880-b241-11e9-8414-325e43c83518.gif)

## Create Custom Themes
Paste in a JSON file for your custom VS Code theme or other VS Code themes not currently in the plugin.

![create custom theme](https://user-images.githubusercontent.com/35271042/62099021-8e358000-b241-11e9-8798-a87f407b6e6f.gif)


# How to use

## 1. Generate color styles

First, you'll need to generate color guides and styles in your new file. In the "Generate" tab, select the themes you'd like to create or Select All themes.

<img width="300" src="https://pro2-bar.myportfolio.com/v1/assets/4e633164-4a32-429c-b8f4-17e9f5a13f60/a7067dcb-6cb6-4509-93ab-894412829b5f_rw_1200.png?h=be5166f8c62cc1ba848b30c91f3a86d8" />

## 2. Create a custom theme

To create a custom theme, paste in the JSON for your theme into the text box. Note, this should match the formatting for all other VS Code color themes, where the colors are defined `"activityBar.background": "#fafafa"`

<img width="300" src="https://pro2-bar.myportfolio.com/v1/assets/4e633164-4a32-429c-b8f4-17e9f5a13f60/c3ae4a81-d9c6-4772-896a-93bed359b796_rw_1200.png?h=3bb4c40f40e2cdb71be28f3c44291168" />

## 3. Swap themes

To swap themes, simply select the frame with all the components you'd like to swap, select the theme you'd like to switch to in the `Swap` tab, and click `Swap Theme`. The themes must be present in the file to switch themes.

You can also relink color styles by having the layers name the same name as their desired color and appending three dashes (`---`). For example, the side bar background layer would need to be named `---sideBar.background`. This is what enables Kaleidocode to go find the color style for the desired theme and relink it.

<img width="300" src="https://pro2-bar.myportfolio.com/v1/assets/4e633164-4a32-429c-b8f4-17e9f5a13f60/3923eb9e-5a14-4cc8-b039-d23153fd507a_rw_1200.png?h=8ccc5da80e55c67ef6956746f9ab38ab" />


# Building the source code
This plugin template uses Typescript. If you are familiar with Javascript, Typescript will
look very familiar. In fact, valid Javascript code is already valid Typescript code.

Typescript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using Typescript requires a compiler to convert Typescript (code.ts) into Javascript (code.js)
for the browser to run.

To get the TypeScript compiler working:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Install the TypeScript compiler globally: `sudo npm install -g typescript`.
3. Open this directory in Visual Studio Code.
4. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
    then select "tsc: watch - tsconfig.json". You will have to do this again every time
    you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.
