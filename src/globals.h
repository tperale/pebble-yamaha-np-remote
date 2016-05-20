#ifndef GLOBALS_H
#define GLOBALS_H

#include <pebble.h>
#include "./appinfo.h"

extern int32_t t_sound_level;

extern int32_t t_mute_status;

#define POWER_STATUS_ON 0
#define POWER_STATUS_STANDBY 1
#define POWER_STATUS_OFF 2
extern int32_t t_power_status;

extern char t_current_source[32];

void send_request (int key, int value);

#endif
