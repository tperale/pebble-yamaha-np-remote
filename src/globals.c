#include "./globals.h"

void send_request (int value) {
    // Declare the dictionary's iterator
    DictionaryIterator* out_iter;

    // Prepare the outbox buffer for this message
    AppMessageResult result = app_message_outbox_begin(&out_iter);
    if (result == APP_MSG_OK) {
        // Add an item to ask for weather data
        int value = 0;
        dict_write_int(out_iter, Request, &value, sizeof(int), true);
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


