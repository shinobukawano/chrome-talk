// This class is used as Mixin.
Ext.define('CT.util.WebRTC', {

    requires: [
        'CT.util.Conf'
    ],

    // Need to replace config?
    config: {
        mediaConstraints: {
            'mandatory': {
                'OfferToReceiveAudio': true,
                'OfferToReceiveVideo': true
            }
        }
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
    },

    readySocket: function () {
        var me = this;
        me.socket = io.connect(CT.util.Conf.SERVER_URL);

        // socket: channel connected
        me.socket.on('connect', Ext.bind(me.onOpened, me))
            .on('message', Ext.bind(me.onMessage, me));
    },

    onOpened: function () {
        console.log('socket opened.');
        this.socketReady = true;
    },

    onMessage: function (evt) {
        var me = this;

        if (evt.type === 'offer') {
            console.log("Received offer, set offer, sending answer....");
            me.onOffer(evt);
        } else if (evt.type === 'answer' && me.peerStarted) {
            console.log('Received answer, settinng answer SDP');
            me.onAnswer(evt);
        } else if (evt.type === 'candidate' && me.peerStarted) {
            console.log('Received ICE candidate...');
            me.onCandidate(evt);
        } else if (evt.type === 'user dissconnected' && me.peerStarted) {
            console.log("disconnected");
            me.stop();
        }
    },

    sendOffer: function () {
        var me = this;
        me.peerConnection = me.prepareNewConnection();

        me.peerConnection.createOffer(function (sessionDescription) { // in case of success
            me.peerConnection.setLocalDescription(sessionDescription);
            console.log("Sending: SDP");
            console.log(sessionDescription);
            me.sendSDP(sessionDescription);
        }, function () { // in case of error
            console.log("Create Offer failed");
        }, me.getMediaConstraints);
    },

    setCallback: function (callback) {
        this.callback = callback;
    },

    prepareNewConnection: function () {
        var me = this;
        var pc_config = {"iceServers": []};
        var peer = null;

        try {
            peer = new webkitRTCPeerConnection(pc_config);
        } catch (e) {
            console.log("Failed to create peerConnection, exception: " + e.message);
        }

        // send any ice candidates to the other peer
        peer.onicecandidate = function (evt) {
            if (evt.candidate) {
                console.log(evt.candidate);
                me.sendCandidate({
                        type: "candidate",
                        sdpMLineIndex: evt.candidate.sdpMLineIndex,
                        sdpMid: evt.candidate.sdpMid,
                        candidate: evt.candidate.candidate
                    }
                );
            } else {
                console.log("End of candidates. ------------------- phase=" + evt.eventPhase);
            }
        };

        console.log('Adding local stream...');
        peer.addStream(me.localStream);

        peer.addEventListener("addstream", onRemoteStreamAdded, false);
        peer.addEventListener("removestream", onRemoteStreamRemoved, false);

        // when remote adds a stream, hand it on to the local video element
        function onRemoteStreamAdded(event) {
            console.log("Added remote stream");
            // remoteVideo.src = window.webkitURL.createObjectURL(event.stream);

            var targetEl = me.el.down('video[id=remoteVideo]');
            me.attach(event.stream, targetEl);

            if (Ext.isFunction(me.callback)) {
                me.callback();
            }
        }

        // when remote removes a stream, remove it from the local video element
        function onRemoteStreamRemoved(event) {
            console.log("Remove remote stream");
            // remoteVideo.src = "";
            var targetEl = me.el.down('video[id=remoteVideo]');
            me.remove(targetEl);

            if (Ext.isFunction(me.callback)) {
                me.callback();
            }
        }

        return peer;
    },

    sendSDP: function (sdp) {
        var me = this,
            text = JSON.stringify(sdp);
        console.log("---sending sdp text ---");
        console.log(text);

        // send via socket
        me.socket.json.send(sdp);
    },

    onOffer: function (evt) {
        var me = this;

        console.log("Received offer...");
        console.log(evt);
        me.setOffer(evt);
        me.sendAnswer(evt);

        me.peerStarted = true;
    },

    setOffer: function (evt) {
        var me = this;
        if (me.peerConnection) {
            console.error('peerConnection alreay exist!');
        }
        me.peerConnection = me.prepareNewConnection();
        me.peerConnection.setRemoteDescription(new RTCSessionDescription(evt));
    },

    sendAnswer: function (evt) {
        var me = this;
        console.log('sending Answer. Creating remote session description...');
        if (!me.peerConnection) {
            console.error('peerConnection NOT exist!');
            return;
        }

        me.peerConnection.createAnswer(function (sessionDescription) { // in case of success
            me.peerConnection.setLocalDescription(sessionDescription);
            console.log("Sending: SDP");
            console.log(sessionDescription);
            me.sendSDP(sessionDescription);
        }, function () { // in case of error
            console.log("Create Answer failed");
        }, me.getMediaConstraints);
    },

    onAnswer: function (evt) {
        console.log("Received Answer...");
        console.log(evt);
        this.setAnswer(evt);
    },

    setAnswer: function (evt) {
        var me = this;

        if (!me.peerConnection) {
            console.error('peerConnection NOT exist!');
            return;
        }
        me.peerConnection.setRemoteDescription(new RTCSessionDescription(evt));
    },

    sendCandidate: function (candidate) {
        var me = this;
        var CR = String.fromCharCode(13);
        var text = JSON.stringify(candidate);

        console.log("---sending candidate text ---");
        console.log(text);

        // send via socket
        me.socket.json.send(candidate);
    },

    onCandidate: function (evt) {
        var candidate = new RTCIceCandidate({
            sdpMLineIndex: evt.sdpMLineIndex,
            sdpMid: evt.sdpMid,
            candidate: evt.candidate
        });

        console.log("Received Candidate...");
        console.log(candidate);

        this.peerConnection.addIceCandidate(candidate);
    },

    stop: function () {
        var me = this;

        me.peerConnection.close();
        me.peerConnection = null;
        me.peerStarted = false;
    }

});
