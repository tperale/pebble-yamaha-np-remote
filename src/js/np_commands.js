module.exports.tags = {
    soundLevel : 'Lvl',
    // function (content) {
    //     var re = new RegExp('<Lvl>[\s\S]*?<\/Lvl>');
    //     return re.exec(content);
    // },
    muteStatus : 'Mute',
    // function (content) {
    //     var re = new RegExp('<Mute>[\s\S]*?<\/Mute>');
    //     return re.exec(content);
    // },
    powerStatus : 'Power',
    // function (content) {
    //     var re = new RegExp('<Power>[\s\S]*?<\/Power>');
    //     return re.exec(content);
    // },
    currentSource : 'Input_Sel',
    // function (content) {
    //     var re = new RegExp('<Input_Sel>[\s\S]*?<\/Input_Sel>');
    //     return re.exec(content);
    // },
};

module.exports.commands = {
    select : {
        toCd       : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>CD</Input_Sel></Input></System></YAMAHA_AV>';
        },
        toTuner    : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>TUNER</Input_Sel></Input></System></YAMAHA_AV>';
        },
        toUsb      : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>USB</Input_Sel></Input></System></YAMAHA_AV>';
        },
        toServer   : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>SERVER</Input_Sel></Input></System></YAMAHA_AV>';
        },

        toNetradio : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>NET RADIO</Input_Sel></Input></System></YAMAHA_AV>';
        },
        toSpotify  : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>Spotify</Input_Sel></Input></System></YAMAHA_AV>';
        },
        toAirplay  : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>AirPlay</Input_Sel></Input></System></YAMAHA_AV>';
        },
        toAux1     : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>AUX1</Input_Sel></Input></System></YAMAHA_AV>';
        },
        toAux2     : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>AUX2</Input_Sel></Input></System></YAMAHA_AV>';
        },
        toDigital1 : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>DIGITAL1</Input_Sel></Input></System></YAMAHA_AV>';
        },
        toDigital2 : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Input><Input_Sel>DIGITAL2</Input_Sel></Input></System></YAMAHA_AV>';
        },
    },

    hardware : {
        powerParam : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><System><Power_Control><Power>GetParam</Power></Power_Control></System></YAMAHA_AV>';
        },
        status  : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><System><Basic_Status>GetParam</Basic_Status></System></YAMAHA_AV>';
        },
        trayToggle  : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Misc><Tray>Open/Close</Tray></Misc></System></YAMAHA_AV>';
        },
        powerToggle : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Power_Control><Power>On/Standby</Power></Power_Control></System></YAMAHA_AV>';
        },
    },

    volume : {
        get        : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><System><Volume><Lvl>GetParam</Lvl></Volume></System></YAMAHA_AV>';
        },
        muteToggle : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Volume><Mute>On/Off</Mute></Volume></System></YAMAHA_AV>';
        },
        up         : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Volume><Lvl>Up</Lvl></Volume></System></YAMAHA_AV>';
        },
        down       : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"PUT\"><System><Volume><Lvl>Down</Lvl></Volume></System></YAMAHA_AV>';
        },
    },

    tuner : {
        status : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><Tuner><Play_Info>GetParam</Play_Info></Tuner></YAMAHA_AV>';
        },
        preset : function () {
            return '<?xml version=\"1.0\" encoding=\"utf-8\"?><YAMAHA_AV cmd=\"GET\"><Tuner><Play_Control><Preset><FM><Preset_Sel_Item>GetParam</Preset_Sel_Item></FM></Preset></Play_Control></Tuner></YAMAHA_AV>';
        },
    },

 };

