// This class is used as Mixin.
Ext.define('CT.util.WebRTC', {

    hello: function () {
        Ext.Msg.alert('hi', 'hello!');
    },

    onGetUserMedia: function (stream) {
        var targetEl = this.el.down('video[id=localVideo]');
        this.attach(stream, targetEl);
    },

    onFailureGetUserMedia: function (error) {
        Ext.Msg.alert('error');
    },

    attach: function (stream, targetEl) {
        var me = this,
            video = targetEl.dom;

        //attachMediaStream(video, stream); // This is adapter.js function

        video.src = URL.createObjectURL(stream);

        setTimeout(function () {
            video.play();
        });

        me.localStream = stream;
    }

});
