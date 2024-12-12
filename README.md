
1.Make sure node,Java already setop in your system.(Make sure Ionic also already set globaly : npm install -g @ionic/cli)
2.Make a new app or pull a app from git. 
3.Do npm install and ru the application Ionic serve.
4.when you want to build the app
    *Check if capaceter by defalt set ,If no do npm install @capacitor/core @capacitor/cli 
    *Once Caaceter Check ,make sure Android studio is installed and the path is already set.
    *For 1st time 
        ionic build 
        npx cap add android 
        npx cap sync android 
        npx cap open android

    *For every updste build
        ionic build 
        npx cap sync android 
        npx cap open android
5.Last command will open your android code in android studio.
6.In Android Studio:
        Go to Build > Build Bundle(s) / APK(s) > Build APK(s).
	    This generates a debug APK.
