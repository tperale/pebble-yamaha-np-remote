var yamaha_np_address = 'http://192.168.0.102';

var api_address = yamaha_np_address + '/YamahaRemoteControl/ctrl';


var yamaha_np_tags = {
    'sound_level_tag' : 'Lvl',
    'mute_status_tag' : 'Mute',
    'power_status_tag' : 'Power',
    'current_source_tag' : 'Input_Sel'
};


var yamaha_np_commands = {
  cd                 : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>CD</Input_Sel></Input></System></YAMAHA_AV>';
  },
  tray               : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Misc><Tray>Open/Close</Tray></Misc></System></YAMAHA_AV>';
  },
  tuner              : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>TUNER</Input_Sel></Input></System></YAMAHA_AV>';
  },
  tuner_preset      : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><Tuner><Play_Control><Preset><FM><Preset_Sel_Item>GetParam</Preset_Sel_Item></FM></Preset></Play_Control></Tuner></YAMAHA_AV>';
  },
  usb                : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>USB</Input_Sel></Input></System></YAMAHA_AV>';
  },
  server            : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>SERVER</Input_Sel></Input></System></YAMAHA_AV>';
  },

  netradio          : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>NET RADIO</Input_Sel></Input></System></YAMAHA_AV>';
  },
  spotify           : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>Spotify</Input_Sel></Input></System></YAMAHA_AV>';
  },
  airplay           : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>AirPlay</Input_Sel></Input></System></YAMAHA_AV>';
  },
  aux1               : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>AUX1</Input_Sel></Input></System></YAMAHA_AV>';
  },
  aux2               : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>AUX2</Input_Sel></Input></System></YAMAHA_AV>';
  },
  digital1          : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>DIGITAL1</Input_Sel></Input></System></YAMAHA_AV>';
  },
  digital2          : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>DIGITAL2</Input_Sel></Input></System></YAMAHA_AV>';
  },

  power_param       : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><System><Power_Control><Power>GetParam</Power></Power_Control></System></YAMAHA_AV>';
  },
  power_toggle      : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Power_Control><Power>On/Standby</Power></Power_Control></System></YAMAHA_AV>';
  },

  get_volume        : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><System><Volume><Lvl>GetParam</Lvl></Volume></System></YAMAHA_AV>';
  },
  mute_toggle       : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Volume><Mute>On/Off</Mute></Volume></System></YAMAHA_AV>';
  },
  volume_up         : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Volume><Lvl>Up</Lvl></Volume></System></YAMAHA_AV>';
  },
  volume_down       : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Volume><Lvl>Down</Lvl></Volume></System></YAMAHA_AV>';
  },

  get_basic_status  : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><System><Basic_Status>GetParam</Basic_Status></System></YAMAHA_AV>';
  },
  get_tuner_status  : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><Tuner><Play_Info>GetParam</Play_Info></Tuner></YAMAHA_AV>';
  },
  get_tuner_presets : function () {
      return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><Tuner><Play_Control><Preset><FM><Preset_Sel_Item>GetParam</Preset_Sel_Item></FM></Play_Control></Preset></Tuner></YAMAHA_AV>';
  },
};


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
    xhr.send(yamaha_np_commands[command]());
    console.log('Sended command ' + yamaha_np_commands[command]() + ' to ' + api_address);
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
    xhr.send(yamaha_np_commands[command]());
};


var get_basic = function () {
    request('get_basic_status', function (response) {
        var sound_lvl = parseInt(response.getElementsByTagName(yamaha_np_tags.sound_level_tag)[0].textContent, 10);
        console.log('Sound level is : ' + sound_lvl);
        basic_info.KEY_SOUND_LVL = sound_lvl;

        var mute_status;
        switch (response.getElementsByTagName(yamaha_np_tags.mute_status_tag)[0].textContent) {
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
        switch (response.getElementsByTagName(yamaha_np_tags.power_status_tag)[0].textContent) {
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

        var current_source = response.getElementsByTagName(yamaha_np_tags.current_source_tag)[0].textContent;
        basic_info.KEY_CURRENT_SOURCE = current_source;
        console.log('Current source is : ' + current_source);
    });
};

var main = function (request_type) {
    console.log('Got a request : ' + request_type);
    switch (request_type) {
        case 0:
            send_action('cd');
            break;
        case 1:
            send_action('tuner');
            break;
        case 2:
            send_action('usb');
            break;
        case 3:
            send_action('server');
            break;
        case 4:
            send_action('netradio');
            break;
        case 5:
            send_action('spotify');
            break;
        case 6:
            send_action('airplay');
            break;
        case 7:
            send_action('aux1');
            break;
        case 8:
            send_action('aux2');
            break;
        case 9:
            send_action('digital1');
            break;
        case 10:
            send_action('digital2');
            break;
        case 11:
            send_action('power_toggle');
            break;
        case 12:
            send_action('mute_toggle');
            break;
        case 13:
            send_action('volume_up');
            break;
        case 14:
            send_action('volume_down');
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
