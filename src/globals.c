#include "./globals.h"

int32_t t_sound_level = 0;
int32_t t_mute_status = 0;
int32_t t_power_status = 0;
char t_current_source[32];

void send_request (int key, int value) {
    APP_LOG(APP_LOG_LEVEL_DEBUG, "Sending request : %i", value);
    // Declare the dictionary's iterator
    DictionaryIterator* out_iter;

    // Prepare the outbox buffer for this message
    AppMessageResult result = app_message_outbox_begin(&out_iter);
    if (result == APP_MSG_OK) {
        // Add an item to ask for weather data
        dict_write_int(out_iter, key, &value, sizeof(int), false);
        // Send this message
        result = app_message_outbox_send();
        if (result != APP_MSG_OK) {
            APP_LOG(APP_LOG_LEVEL_ERROR, "Error sending the outbox: %d", (int)result);
        }
    } else {
        // The outbox cannot be used right now
        APP_LOG(APP_LOG_LEVEL_ERROR, "Error preparing the outbox: %d", (int)result);
    }
}
