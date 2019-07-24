import { SpeechRecognition } from "nativescript-speech-recognition";
const msgs = {
    not_av: 'Speech recognition is not available on your device',
    permission: 'We can\'t make voice search without audio recording permission',
};

export default class SpeechToText{

    static start() {
        return new Promise(async (resolve, reject) => {
            this.init();
            if (! await speechRecognition.available()) {
                this.showMessage('not_av');
                reject('not_av'); return;
            }

            if (! await this.speechRecognition.requestPermission()) {
                this.showMessage();
                reject('permission'); return;
            }

            this.speechRecognition.startListening(
                {
                    // locale: "en-US",
                    // returnPartialResults: true,
                    onResult: (transcription) => {
                        // console.log(`User said: ${transcription.text}`);
                        // console.log(`User finished?: ${transcription.finished}`);
                        resolve(transcription.text);
                    },
                    onError: (error) => reject(error)
                }
            ).then(
                (started) => { console.log(`started listening`) },
                (errorMessage) => reject(errorMessage)
            ).catch((error) => {
                reject(error);
            });
        });
    }

    static init(){
        if(this.inited) return;
        this.inited = true;
        this.speechRecognition = new SpeechRecognition();

    }

    static showMessage(msgId){
        alert({
            title: 'Voice search',
            message: msgs[msgId],
            okButtonText: 'OK',
        })
    }

}