/*
 * File: app/view/WebRTC.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CT.view.WebRTC', {
    extend: 'Ext.Component',
    alias: 'widget.webrtc',

    mixins: {
        webRTC: 'CT.util.WebRTC'
    },
    requires: [
        'CT.view.WebRTCViewModel',
        'CT.util.WebRTC'
    ],

    config: {
        useVideo: true,
        useAudio: true
    },

    viewModel: {
        type: 'webrtc'
    },
    html: '<video id="localVideo" style="height:100%"></video>\n<video id="remote" style="height:100%"></video>',
    id: 'video',
    width: 150,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onAfterRender'
    },

    onAfterRender: function(component, eOpts) {
        var me = this;

        var successFn = Ext.bind(me.onGetUserMedia, me);
        var failureFn = Ext.bind(me.onFailureGetUserMedia, me);

        if (Ext.isEmpty(navigator.webkitGetUserMedia)) {
            failureFn();
            return;
        }

        navigator.webkitGetUserMedia({
            video: me.getUseVideo(),
            audio: me.getUseAudio()
        }, successFn, failureFn);

    }

});