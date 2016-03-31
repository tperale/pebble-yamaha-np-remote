var yamaha_np_address = "";

var api_address = yamaha_np_address + "/YamahaRemoteControl/ctrl";

var yamaha_np_commands = {
    'cd' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>CD</Input_Sel></Input></System></YAMAHA_AV>',
    'tray' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Misc><Tray>Open/Close</Tray></Misc></System></YAMAHA_AV>',

    'tuner' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>TUNER</Input_Sel></Input></System></YAMAHA_AV>',
    'tuner_preset' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><Tuner><Play_Control><Preset><FM><Preset_Sel_Item>GetParam</Preset_Sel_Item></FM></Preset></Play_Control></Tuner></YAMAHA_AV>',

    'usb' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>USB</Input_Sel></Input></System></YAMAHA_AV>',

    'server' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>SERVER</Input_Sel></Input></System></YAMAHA_AV>',

    'netradio' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>NET RADIO</Input_Sel></Input></System></YAMAHA_AV>',

    'spotify' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>Spotify</Input_Sel></Input></System></YAMAHA_AV>',

    'airplay' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>AirPlay</Input_Sel></Input></System></YAMAHA_AV>',

    'aux1' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>AUX1</Input_Sel></Input></System></YAMAHA_AV>',
    'aux2' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>AUX2</Input_Sel></Input></System></YAMAHA_AV>',

    'digital1' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>DIGITAL1</Input_Sel></Input></System></YAMAHA_AV>',
    'digital2' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>DIGITAL2</Input_Sel></Input></System></YAMAHA_AV>',

    'mute_toggle' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Volume><Mute>On/Off</Mute></Volume></System></YAMAHA_AV>',

    'power_param' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><System><Power_Control><Power>GetParam</Power></Power_Control></System></YAMAHA_AV>',
    'power_toggle' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Power_Control><Power>On/Standby</Power></Power_Control></System></YAMAHA_AV>',

    'get_volume' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><System><Volume><Lvl>GetParam</Lvl></Volume></System></YAMAHA_AV>',
    'volume_up' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Volume><Lvl>Up</Lvl></Volume></System></YAMAHA_AV>',
    'volume_down' : '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Volume><Lvl>Down</Lvl></Volume></System></YAMAHA_AV>'
};


var send_action = function (command) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', api_address);
    xhr.send(yamaha_np_commands[command]);
};


var request = function (command, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        callback(this.responseText);
    };
    xhr.open('POST', api_address);
    xhr.send(yamaha_np_commands[command]);
};


var main = function (request) {
    switch (request)  {
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
    }

    Pebble.sendAppMessage(dictionary,
        function(e) {
            console.log('Info sent to Pebble successfully!');
        },
        function(e) {
            console.log('Error sending info to Pebble!');
        }
    );
}

Pebble.addEventListener('appmessage',
    function(e) {
        console.log('PebbleKit JS ready!');

    }
); 


Pebble.addEventListener('ready',
    function(e) {
        console.log('PebbleKit JS ready!');

    }
); 
