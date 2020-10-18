### Instructions for running the project

1. Git Clone : https://github.com/MagicBoUNSW/UdaciCards
2. run the command : npm install 
3. run the command : npm start 
4. Project will run on http://localhost:19002/
5. Click to Tunnel button 
6. use Expo Client to run project by :
    + Download : https://expo.io/tools
    + Use Camera Iphone to scan the QR code 
    + Then click Expo icon

### Platforms

+ I used iOS devices to test this app.

### Errors

if you get this error : Unable to resolve "./environment/muteWarnings.fx" from "node_modules/expo/build/Expo.fx.expo.js"

+ Solution : run the command : expo r -c

If you get this error: TaskQueue: Error with task: undefined is not an object (evaluating '_this.view._component.measureInWindow') in react native

+ Go to the dir node_modules/react-native-safe-area-view/index.js and update:

+ from:

+ this.view._component.measureInWindow((winX, winY, winWidth, winHeight) => {
+ to:

+ this.view.getNode().measureInWindow((winX, winY, winWidth, winHeight) => {


