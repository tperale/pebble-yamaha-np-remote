#include "./win_select_source.h"

static Window* s_window = NULL;
static SimpleMenuLayer* s_menu_layer = NULL;

#define NUMBER_OF_SECTIONS 1
static SimpleMenuSection s_menu_sections[NUMBER_OF_SECTIONS];
#define NUMBER_OF_SOURCE 11
static SimpleMenuItem s_source_menu_item[NUMBER_OF_SOURCE];


/* ----- Source selection. */
static void select_source_cd () {
    send_request(REQUEST_SOURCE_CHANGE_TO_CD);
    window_stack_pop(true);
}

static void select_source_tuner () {
    send_request(REQUEST_SOURCE_CHANGE_TO_TUNER);
    window_stack_pop(true);
}

static void select_source_usb () {
    send_request(REQUEST_SOURCE_CHANGE_TO_USB);
    window_stack_pop(true);
}

static void select_source_server () {
    send_request(REQUEST_SOURCE_CHANGE_TO_SERVER);
    window_stack_pop(true);
}

static void select_source_netradio () {
    send_request(REQUEST_SOURCE_CHANGE_TO_NETRADIO);
    window_stack_pop(true);
}

static void select_source_spotify () {
    send_request(REQUEST_SOURCE_CHANGE_TO_SPOTIFY);
    window_stack_pop(true);
}

static void select_source_airplay () {
    send_request(REQUEST_SOURCE_CHANGE_TO_AIRPLAY);
    window_stack_pop(true);
}

static void select_source_aux_one () {
    send_request(REQUEST_SOURCE_CHANGE_TO_AUX1);
    window_stack_pop(true);
}

static void select_source_aux_two () {
    send_request(REQUEST_SOURCE_CHANGE_TO_AUX2);
    window_stack_pop(true);
}

static void select_source_digital_one () {
    send_request(REQUEST_SOURCE_CHANGE_TO_DIGITAL1);
    window_stack_pop(true);
}

static void select_source_digital_two () {
    send_request(REQUEST_SOURCE_CHANGE_TO_DIGITAL2);
    window_stack_pop(true);
}
/* -------------------------------------------- */

static void window_load (Window* window) {
    s_source_menu_item[0] = (SimpleMenuItem) {
        .title = "CD",
        /* .subtitle = "CD Tray" */
        /* .icon = , */
        .callback = select_source_cd,
    };

    s_source_menu_item[1] = (SimpleMenuItem) {
        .title = "TUNER",
        /* .subtitle = "Frequency" */
        /* .icon = , */
        .callback = select_source_tuner,
    };

    s_source_menu_item[2] = (SimpleMenuItem) {
        .title = "USB",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_usb,
    };

    s_source_menu_item[3] = (SimpleMenuItem) {
        .title = "SERVER",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_server,
    };

    s_source_menu_item[3] = (SimpleMenuItem) {
        .title = "SERVER",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_server,
    };

    s_source_menu_item[4] = (SimpleMenuItem) {
        .title = "NETRADIO",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_netradio,
    };

    s_source_menu_item[5] = (SimpleMenuItem) {
        .title = "SPOTIFY",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_spotify,
    };

    s_source_menu_item[6] = (SimpleMenuItem) {
        .title = "AIRPLAY",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_airplay,
    };

    s_source_menu_item[7] = (SimpleMenuItem) {
        .title = "AUX 1",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_aux_one,
    };

    s_source_menu_item[8] = (SimpleMenuItem) {
        .title = "AUX 2",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_aux_two,
    };

    s_source_menu_item[9] = (SimpleMenuItem) {
        .title = "DIGITAL 1",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_digital_one,
    };

    s_source_menu_item[10] = (SimpleMenuItem) {
        .title = "DIGITAL 2",
        /* .subtitle = "" */
        /* .icon = , */
        .callback = select_source_digital_two,
    };

    s_menu_sections[0] = (SimpleMenuSection) {
        .title = "Select source.",
        .num_items = NUMBER_OF_SOURCE,
        .items = s_source_menu_item,
    };

    Layer* window_layer = window_get_root_layer(window);
    GRect bounds = layer_get_frame(window_layer);

    s_menu_layer = simple_menu_layer_create(bounds, window, s_menu_sections, NUMBER_OF_SECTIONS, NULL);

    layer_add_child(window_layer, simple_menu_layer_get_layer(s_menu_layer));
}

static void window_unload (Window* window) {
    simple_menu_layer_destroy(s_menu_layer);
}

void win_select_source_show (void) {
    window_stack_push(s_window, true);
}

void win_select_source_init (void) {
    s_window = window_create();
    /* window_set_fullscreen (s_window, true); */
    window_set_window_handlers(s_window, (WindowHandlers) {
            .load = window_load,
            .unload = window_unload,
    });
}

void win_select_source_deinit (void) {
    window_destroy(s_window);
}
