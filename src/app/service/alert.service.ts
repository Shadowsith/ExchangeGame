import { AlertController } from '@ionic/angular';

export class AlertService {
    private alertController = new AlertController();

    public async showMsg(header: string, subheader: string,
        msg: string, button = 'OK') {
        const alert = await this.alertController.create({
            header: header,
            backdropDismiss: false,
            subHeader: subheader,
            message: msg,
            buttons: [button]
        });
        await alert.present();
    }

    public async askMsg(header: string, subheader: string, msg: string): Promise<boolean> {
        let res = false;
        const alert = await this.alertController.create({
            header: header,
            subHeader: subheader,
            message: msg,
            buttons: [ {
                text: 'OK',
                role: 'ok',
                handler: () => { res = true; }
            }, 
            {
                text: 'Abort',
                role: 'dismiss',
                handler: () => { res = false; }
            }]
        });
        await alert.present();
        await alert.onDidDismiss();
        return res;
    }
}