var NP = require('./np_commands.js');
var app = require('./appinfo.js');

var yamaha_np_address = 'http://192.168.0.102';

var api_address = yamaha_np_address + '/YamahaRemoteControl/ctrl';

/* @desc : Just send an action without any callback.
 *
 * @param {command} : Commmand to pass to the player.
 */
var send_action = function (command) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', api_address);
    xhr.send(command);
    console.log('Sended command ' + command + ' to ' + api_address);
};

/* @desc : Just send an action with a callback for the response.
 *
 * @param {command} : Commmand to pass to the player.
 * @param {callback} : function to pass the response into.
 */
var request = function (command, callback) {
    var xhr = new XMLHttpRequest();
    // xhr.onload = function () {
    //     callback(this.responseXML);
    // };
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('Received : \n' + xhr.responseText);
            // callback(xhr.responseText);
            callback(xhr.responseXML);
        } else {
            console.log('REQUEST error \n -- Status : ' + xhr.status + '\n -- State : ' + xhr.readyState);  
        }
    }; 
    xhr.open('POST', api_address);
    xhr.send(command);
};


var get_basic = function (callback) {
    request(NP.commands.hardware.status(), function (response) {
        var result = {
            'KEY_SOUND_LVL' : 0,
            'KEY_MUTE_STATUS' : 0,
            'KEY_POWER_STATUS' : 0,
            'KEY_CURRENT_SOURCE' : 'TUNER',
        };

        var sound_lvl = parseInt(response.getElementsByTagName(NP.tags.soundLevel)[0].textContent, 10);
        // var sound_lvl = NP.tags.soundLevel(response);
        console.log('Sound level is : ' + sound_lvl);
        result.KEY_SOUND_LVL = sound_lvl;

        var mute_status;
        switch (response.getElementsByTagName(NP.tags.mute_status_tag)[0].textContent) {
            case 'On':
                mute_status = 1;
                break;
            case 'Off':
                mute_status = 0; 
                break;
            default:
                mute_status = null;
                break;
        }
        console.log('Mute status is : ' + mute_status);
        result.KEY_MUTE_STATUS = mute_status;

        var power_status;
        switch (response.getElementsByTagName(NP.tags.powerStatus)[0].textContent) {
            case 'On':
                power_status = 0;
                break;
            case 'Standby':
                power_status = 1;
                break;
            case 'Off':
                power_status = 2;
                break;
            default:
                power_status = null;
                break;
        }
        console.log('Power status is : ' + power_status);
        result.KEY_POWER_STATUS = power_status;

        var current_source = response.getElementsByTagName(NP.tags.currentSource)[0].textContent;
        result.KEY_CURRENT_SOURCE = current_source;
        console.log('Current source is : ' + current_source);

        if (callback) callback(result);
    });
};

var main = function (request_type) {
    console.log('Got a request : ' + request_type);
    switch (request_type) {
        case app.REQUEST_CHANGE_TO_CD:
            send_action(NP.commands.select.toCd());
            break;
        case app.REQUEST_CHANGE_TO_TUNER:
            send_action(NP.commands.select.toTuner());
            break;
        case app.REQUEST_CHANGE_TO_USB:
            send_action(NP.commands.select.toUsb());
            break;
        case app.REQUEST_CHANGE_TO_SERVER:
            send_action(NP.commands.select.toServer());
            break;
        case app.REQUEST_CHANGE_TO_NETRADIO:
            send_action(NP.commands.select.toNetradio());
            break;
        case app.REQUEST_CHANGE_TO_SPOTIFY:
            send_action(NP.commands.select.toSpotify());
            break;
        case app.REQUEST_CHANGE_TO_AIRPLAY:
            send_action(NP.commands.select.toAirplay());
            break;
        case app.REQUEST_CHANGE_TO_AUX1:
            send_action(NP.commands.select.toAux1());
            break;
        case app.REQUEST_CHANGE_TO_AUX2:
            send_action(NP.commands.select.toAux2());
            break;
        case app.REQUEST_CHANGE_TO_DIGITAL1:
            send_action(NP.commands.select.toDigital1());
            break;
        case app.REQUEST_CHANGE_TO_DIGITAL2:
            send_action(NP.commands.select.toDigital2());
            break;
        case app.REQUEST_POWER_TOGGLE:
            send_action(NP.commands.hardware.powerToggle());
            break;
        case app.REQUEST_MUTE_TOGGLE:
            send_action(NP.commands.volume.muteToggle());
            break;
        case app.REQUEST_VOLUME_UP:
            send_action(NP.commands.volume.up());
            break;
        case app.REQUEST_VOLUME_DOWN:
            send_action(NP.commands.volume.down());
            break;
        default:
            break;
    }
  
    get_basic(function (result) {
        Pebble.sendAppMessage(result,
            function(e) {
                console.log('Info sent to Pebble successfully!');
            },
            function(e) {
                console.log('Error sending info to Pebble!');
            }
        );
    });
};

Pebble.addEventListener('appmessage',
    function(e) {
        console.log('PebbleKit appmessage!');

        if (e.payload['MAKE_REQUEST']) {
            main(e.payload['MAKE_REQUEST']);
        } else if (e.payload['GET']) {
            get_basic(function (result) {
                Pebble.sendAppMessage(result,
                    function(e) {
                        console.log('Info sent to Pebble successfully!');
                    },
                    function(e) {
                        console.log('Error sending info to Pebble!');
                    }
                );
            });
        }
    }
); 

Pebble.addEventListener('ready',
    function(e) {
        console.log('PebbleKit JS ready!');

        get_basic(function (result) {
            Pebble.sendAppMessage(result,
                function(e) {
                    console.log('Info sent to Pebble successfully!');
                },
                function(e) {
                    console.log('Error sending info to Pebble!');
                }
            );
        });

    }
); 
