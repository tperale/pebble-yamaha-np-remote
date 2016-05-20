var NP = require('./np_commands.js');

var yamaha_np_address = 'http://192.168.0.102';

var api_address = yamaha_np_address + '/YamahaRemoteControl/ctrl';

var basic_info = {
  'KEY_SOUND_LVL' : 0,
  'KEY_MUTE_STATUS' : 0,
  'KEY_POWER_STATUS' : 0,
  'KEY_CURRENT_SOURCE' : 'TUNER'
};

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
            callback(xhr.responseXML); // Another callback here
        } else {
            console.log('REQUEST error \n -- Status : ' + xhr.status + '\n -- State : ' + xhr.readyState);  
        }
    }; 
    xhr.open('POST', api_address);
    xhr.send(command);
};


var get_basic = function () {
    request(NP.commands.hardware.status(), function (response) {
        var sound_lvl = parseInt(response.getElementsByTagName(NP.tags.sound_level_tag)[0].textContent, 10);
        console.log('Sound level is : ' + sound_lvl);
        basic_info.KEY_SOUND_LVL = sound_lvl;

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
        basic_info.KEY_MUTE_STATUS = mute_status;

        var power_status;
        switch (response.getElementsByTagName(NP.tags.power_status_tag)[0].textContent) {
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
        basic_info.KEY_POWER_STATUS = power_status;

        var current_source = response.getElementsByTagName(NP.tags.current_source_tag)[0].textContent;
        basic_info.KEY_CURRENT_SOURCE = current_source;
        console.log('Current source is : ' + current_source);
    });
};

var main = function (request_type) {
    console.log('Got a request : ' + request_type);
    switch (request_type) {
        case 0:
            send_action(NP.commands.select.toCd());
            break;
        case 1:
            send_action(NP.commands.select.toTuner());
            break;
        case 2:
            send_action(NP.commands.select.toUsb());
            break;
        case 3:
            send_action(NP.commands.select.toServer());
            break;
        case 4:
            send_action(NP.commands.select.toNetradio());
            break;
        case 5:
            send_action(NP.commands.select.toSpotify());
            break;
        case 6:
            send_action(NP.commands.select.toAirplay());
            break;
        case 7:
            send_action(NP.commands.select.toAux1());
            break;
        case 8:
            send_action(NP.commands.select.toAux2());
            break;
        case 9:
            send_action(NP.commands.select.toDigital1());
            break;
        case 10:
            send_action(NP.commands.select.toDigital2());
            break;
        case 11:
            send_action(NP.commands.hardware.powerToggle());
            break;
        case 12:
            send_action(NP.commands.volume.muteToggle());
            break;
        case 13:
            send_action(NP.commands.volume.up());
            break;
        case 14:
            send_action(NP.commands.volume.down());
            break;
        default:
            break;
    }
  
    get_basic();

    Pebble.sendAppMessage(basic_info,
        function(e) {
            console.log('Info sent to Pebble successfully!');
        },
        function(e) {
            console.log('Error sending info to Pebble!');
        }
    );
};

Pebble.addEventListener('appmessage',
    function(e) {
        console.log('PebbleKit appmessage!');

        main(e.payload['KEY_MAKE_REQUEST']);
    }
); 

Pebble.addEventListener('ready',
    function(e) {
        console.log('PebbleKit JS ready!');

        get_basic();

        Pebble.sendAppMessage(basic_info,
            function(e) {
                console.log('Info sent to Pebble successfully!');
            },
            function(e) {
                console.log('Error sending info to Pebble!');
            }
        );
    }
); 
