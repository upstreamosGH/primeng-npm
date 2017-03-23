import { AfterViewInit, EventEmitter, NgZone, ElementRef } from '@angular/core';
export declare class Captcha implements AfterViewInit {
    _zone: NgZone;
    siteKey: string;
    theme: string;
    type: string;
    size: string;
    tabIndex: number;
    language: string;
    onResponse: EventEmitter<any>;
    onExpire: EventEmitter<any>;
    el: ElementRef;
    captcha: any;
    constructor(_zone: NgZone);
    ngAfterViewInit(): void;
    reset(): void;
    getResponse(): String;
    private recaptchaCallback(response);
    private recaptchaExpiredCallback();
    ngOnDestroy(): void;
}
export declare class CaptchaModule {
}
