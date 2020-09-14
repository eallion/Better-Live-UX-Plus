// ==UserScript==
// @name           Better Live UX Plus
// @name:zh-CN     Better Live UX Plus（斗鱼、虎牙、哔哩哔哩、企鹅电竞 自动选择最高清晰度、禁止弹幕、禁止广告、网页全屏。）
// @namespace      eallion
// @version        2020.09.15
// @description    自动选择最高清晰度、禁止弹幕、禁止广告、网页全屏。支持：斗鱼、虎牙、哔哩哔哩、企鹅电竞。
// @author         eallion
// @run-at         document-idle
// @noframes
// @require        https://cdn.jsdelivr.net/npm/jquery
// @require        https://greasyfork.org/scripts/2199-waitforkeyelements/code/waitForKeyElements.js?version=6349
// @match          *://live.bilibili.com/*
// @match          *://www.douyu.com/*
// @match          *://www.huya.com/*
// @match          *://egame.qq.com/*
// ==/UserScript==

const config = {
    huya: {
        selectors: [
            '#player-danmu-btn',
            'ul.player-videotype-list > li:nth-child(1)',
            'div.ab-close-btn',
            '#player-fullpage-btn',
        ],
        timeout: 1500,
    },
    douyu: {
        selectors: [
            `div[class^='showdanmu-']`,
            `div[class^='tip-'] > ul > li:nth-child(1)`,
            `div[class^='wfs']:not([class^='wfs-exit'])`,
        ],
        timeout: 1500,
    },
    bilibili: {
        selectors: [
            'i.live-icon-danmaku-on',
            'i.live-icon-web-fullscreen',
            //'button[data-title="网页全屏"]',
        ],
        timeout: 1500,
    },
    qq: {
        selectors: [
            'div.vcp-extended-barrage',
            'div.vcp-extended-set',
            'div.live-right-chat',
            'a.vcp-vertical-switcher-item-clarity:nth-child(1)',
            'div.vcp-extended-webfullscreen',
        ],
        timeout: 1500,
    },
}

const site = config[document.domain.split('.').reverse()[1]];

(function() {
    'use strict';

    if (!site) {
        return;
    }

    site.selectors.forEach(selector => {
        setTimeout(() => {
            waitForKeyElements(selector, (node) => {
                node.click();
            });
        }, site.timeout || 0);
    });
})();

(function() {
    'use strict';
 if (location.hostname.indexOf("egame.qq.com")>0){
        document.getElementById("wrap-live").className += " hide-right";
 }
})();

(function() {
    'use strict';
 if (location.hostname.indexOf("huya.com")>0){
        document.getElementById("mode-page-theater").className = "mode-page-full";
        document.getElementById("room-chat-tool-shield").className += " shield-on";
 }
})();
