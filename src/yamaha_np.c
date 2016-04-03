#include <pebble.h>
#include "./windows/win_main.h"

static void update_info () {
    win_main_update();
}

static void outbox_sent_callback (DictionaryIterator* iterator, void* context) {
    APP_LOG(APP_LOG_LEVEL_INFO, "Outbox send sucess.");
}

static void outbox_failed_callback (DictionaryIterator* iterator, AppMessageResult reason , void* context) {
    APP_LOG(APP_LOG_LEVEL_ERROR, "Outbox send failed.");
}

static void inbox_dropped_callback (AppMessageResult reason, void* context) {
    APP_LOG(APP_LOG_LEVEL_ERROR, "Message dropped.");
}

static void inbox_received_callback (DictionaryIterator* iterator, void* context) {
    APP_LOG(APP_LOG_LEVEL_INFO, "Message received.");

    t_sound_level = (int32_t) dict_find (iterator, KEY_SOUND_LVL)->value->int32;
    t_mute_status = (int32_t) dict_find (iterator, KEY_MUTE_STATUS)->value->int32;
    t_power_status = (int32_t) dict_find (iterator, KEY_POWER_STATUS)->value->int32;
    strcpy(t_current_source, (char*) dict_find (iterator, KEY_CURRENT_SOURCE)->value->cstring);

    update_info ();
}

int main(void) {
  app_message_register_inbox_received (inbox_received_callback);
  app_message_register_inbox_dropped (inbox_dropped_callback);
  app_message_register_outbox_failed (outbox_failed_callback);
  app_message_register_outbox_sent (outbox_sent_callback);

  app_message_open(app_message_inbox_size_maximum(), app_message_outbox_size_maximum());

  win_main_init ();
  win_main_show ();

  APP_LOG(APP_LOG_LEVEL_DEBUG, "Done initializing");

  app_event_loop();
  win_main_deinit();
}
