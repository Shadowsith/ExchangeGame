import { AlertController } from '@ionic/angular';

export class AlertService {
    private alertController = new AlertController();

    public async showMsg(header: string, subheader: string,
        msg: string, button = 'OK') {
        const alert = await this.alertController.create({
            header: header,
            subHeader: subheader,
            message: msg,
            buttons: [button]
        });
        await alert.present();
    }
}