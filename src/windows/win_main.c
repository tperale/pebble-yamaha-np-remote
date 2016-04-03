#include "./win_main.h"

static Window* s_window = NULL;
static SimpleMenuLayer* s_menu_layer = NULL;

static ActionBarLayer* action_bar;

#define NUMBER_OF_SECTIONS 2
static SimpleMenuSection s_menu_sections[NUMBER_OF_SECTIONS];

/* - POWER
 * - VOLUME / MUTE
 *
 */
static char volume_level_buffer[32];
static char source_buffer[32];
#define NUMBER_OF_COMMANDS 2
static SimpleMenuItem s_commands_menu_item[NUMBER_OF_COMMANDS];

#define NUMBER_OF_OTHER 1
static SimpleMenuItem s_other_menu_item[NUMBER_OF_OTHER];

static void power_toggle () {
    send_request (REQUEST_POWER_TOGGLE);
}

static void volume_up_handler () {
    send_request (REQUEST_VOLUME_UP);
}

static void volume_down_handler () {
    send_request (REQUEST_VOLUME_DOWN);
}

static void volume_mute_handler () {
    send_request (REQUEST_MUTE_TOGGLE);
}

static void sound_change_action_bar_destroy () {
    action_bar_layer_remove_from_window(action_bar);
    action_bar_layer_destroy(action_bar);
    action_bar = NULL;

    layer_mark_dirty(simple_menu_layer_get_layer(s_menu_layer));

    menu_layer_set_click_config_onto_window(s_menu_layer, window);
}

static void sound_click_config_provider (void* context) {
    window_single_click_subscribe(BUTTON_ID_UP, volume_up_handler);
    window_single_click_subscribe(BUTTON_ID_DOWN, volume_down_handler);
    window_single_click_subscribe(BUTTON_ID_SELECT, volume_mute_handler);
    window_single_click_subscribe(BUTTON_ID_BACK, sound_change_action_bar_destroy);
}

static void sound_change_action_bar_show () {
    action_bar = action_bar_layer_create ();
    action_bar_layer_add_to_window(action_bar, s_window);

    action_bar_layer_set_click_config_provider (action_bar, sound_click_config_provider);
}

static void window_load (Window* window) {
    win_select_source_init ();

    s_commands_menu_item[0] = (SimpleMenuItem) {
        .title = "Power",
        .subtitle = "Turn on.",
        .callback = power_toggle,
    };

    s_commands_menu_item[1] = (SimpleMenuItem) {
        .title = "Volume.",
        .subtitle = "Volume : ",
        .callback = sound_change_action_bar_show,
    };

    s_menu_sections[0] = (SimpleMenuSection) {
        .title = "Commands.",
        .num_items = NUMBER_OF_COMMANDS,
        .items = s_commands_menu_item,
    };


    s_other_menu_item[0] = (SimpleMenuItem) {
        .title = "Change source.",
        .subtitle = "Source : ",
        /* .callback = win_select_source_show, */
    };

    s_menu_sections[1] = (SimpleMenuSection) {
        .title = "Other.",
        .num_items = NUMBER_OF_OTHER,
        .items = s_other_menu_item,
    };

    Layer* window_layer = window_get_root_layer(window);
    GRect bounds = layer_get_frame(window_layer);

    s_menu_layer = simple_menu_layer_create(bounds, window, s_menu_sections, NUMBER_OF_SECTIONS, NULL);

    layer_add_child(window_layer, simple_menu_layer_get_layer(s_menu_layer));
}

static void window_appear (Window* window) {
    send_request(REQUEST_INFO);
}

static void window_unload (Window* window) {
    simple_menu_layer_destroy(s_menu_layer);
}

void win_main_update (void) {
    if (s_menu_layer == NULL) {
        return;
    }

    switch (t_power_status) {
        case POWER_STATUS_ON:
            s_commands_menu_item[0].subtitle = "Turn off.";
            break;
        case POWER_STATUS_STANDBY:
        case POWER_STATUS_OFF:
            s_commands_menu_item[0].subtitle = "Turn on.";
            break;
        default:
            s_commands_menu_item[0].subtitle = "Undefined.";
            break;
    }

    if (t_mute_status) {
        snprintf(volume_level_buffer, 32, "Muted.");
    } else {
        snprintf(volume_level_buffer, 32, "Volume : %ld.", t_sound_level);
    }
    s_commands_menu_item[1].subtitle =  volume_level_buffer;

    snprintf(source_buffer, 32, "Source : %s", t_current_source);
    s_other_menu_item[0].subtitle =  source_buffer;

    layer_mark_dirty(simple_menu_layer_get_layer(s_menu_layer));
}

void win_main_show (void) {
    window_stack_push(s_window, true);
}

void win_main_init (void) {
    s_window = window_create();
    /* window_set_fullscreen (s_window, true); */
    window_set_window_handlers(s_window, (WindowHandlers) {
            .load = window_load,
            .appear = window_appear,
            .unload = window_unload,
    });
}

void win_main_deinit (void) {
    win_select_source_deinit();
}
