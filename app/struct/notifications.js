import { LocalNotifications } from "nativescript-local-notifications";
import { Color } from "tns-core-modules/color";

export default class Notifications{

    static async schedule(title, body, channel){
        const id = this.idPointer++;
        const granted = await LocalNotifications.hasPermission();
        console.log('Permission granted:', granted);
        if(!granted) return;
        await LocalNotifications.schedule(
            [{
                id: id,
                title,
                body,
                bigTextStyle: false,
                color: new Color("#F36F24"),
                // thumbnail: require('~/assets/images/logo.png'),
                forceShowWhenInForeground: true,
                channel: channel || 'default',
                at: new Date(new Date().getTime() + 1000), // 1 seconds from now
              }]
        );
        return id;
    }

}

Notifications.idPointer = 1;