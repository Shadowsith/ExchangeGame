import { RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export class ThemeService {
    renderer: Renderer2;

    constructor(private rendererFac: RendererFactory2, @Inject(DOCUMENT) private doc: Document) {
        this.renderer = this.rendererFac.createRenderer(null, null);
    }

    enableDark() {
        this.renderer.addClass(this.doc.body, 'dark-theme');
    }

    enableLight() {
        this.renderer.removeClass(this.doc.body, 'dark-theme');
    }
}