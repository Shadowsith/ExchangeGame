import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export class ThemeService {
    renderer: Renderer2;

    constructor(private rendererFac: RendererFactory2, @Inject(DOCUMENT) private doc: Document) {
        this.renderer = this.rendererFac.createRenderer(null, null);
    }

    enableDark(statusbar: StatusBar = null) {
        this.renderer.addClass(this.doc.body, 'dark-theme');
        if (statusbar !== null) {
            statusbar.backgroundColorByHexString('#6a64ff');
        }
    }

    enableLight(statusbar: StatusBar = null) {
        this.renderer.removeClass(this.doc.body, 'dark-theme');
        if (statusbar !== null) {
            statusbar.backgroundColorByHexString('#428cff');
        }
    }
}