#include "./win_main.h"

static Window* s_window = NULL;
static MenuLayer* s_menu_layer = NULL;

static ActionBarLayer* action_bar;

static GBitmap* volume_up_icon;
static GBitmap* volume_down_icon;
static GBitmap* volume_mute_icon;

static char volume_level_buffer[32];
static char source_buffer[32];

static void power_toggle () {
    send_request (MAKE_REQUEST, REQUEST_POWER_TOGGLE);
}

static void volume_up_handler () {
    send_request (MAKE_REQUEST, REQUEST_VOLUME_UP);
}

static void volume_down_handler () {
    send_request (MAKE_REQUEST, REQUEST_VOLUME_DOWN);
}

static void volume_mute_handler () {
    send_request (MAKE_REQUEST, REQUEST_MUTE_TOGGLE);
}

static void sound_change_action_bar_destroy () {
    action_bar_layer_remove_from_window(action_bar);
    action_bar_layer_destroy(action_bar);
    action_bar = NULL;

    layer_mark_dirty(menu_layer_get_layer(s_menu_layer));
    /* menu_layer_reload_data(s_menu_layer); */

    menu_layer_set_click_config_onto_window(s_menu_layer, s_window);
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

    action_bar_layer_set_icon_animated(action_bar, BUTTON_ID_UP, volume_up_icon, true);
    action_bar_layer_set_icon_animated(action_bar, BUTTON_ID_DOWN, volume_down_icon, true);
    action_bar_layer_set_icon_animated(action_bar, BUTTON_ID_SELECT, volume_mute_icon, true);
}

/* ---------------------------------------------------
 * Création de la fenêtre principale.
 * ---------------------------------------------------
 */
#define NUMBER_OF_SECTIONS 2
static uint16_t menu_get_num_sections_callback(MenuLayer* menu_layer, void* data) {
    return NUMBER_OF_SECTIONS;
}

#define NUMBER_OF_COMMANDS 2
#define NUMBER_OF_OTHER 1
static uint16_t menu_get_num_rows_callback(MenuLayer* menu_layer, uint16_t section_index, void* data) {
    switch (section_index) {
        case 0:
            return NUMBER_OF_COMMANDS;
        case 1:
            return NUMBER_OF_OTHER;
        default:
            return 0;
    }
}

static int16_t menu_get_header_height_callback(MenuLayer* menu_layer, uint16_t section_index, void* data) {
    return MENU_CELL_BASIC_HEADER_HEIGHT;
}

static void menu_draw_header_callback(GContext* ctx, const Layer* cell_layer, uint16_t section_index, void* data) {
    switch (section_index) {
        case 0:
            menu_cell_basic_header_draw(ctx, cell_layer, "Commands");
            break;
        case 1:
            menu_cell_basic_header_draw(ctx, cell_layer, "Others.");
            break;
    }
}

static void menu_draw_row_callback(GContext* ctx, const Layer* cell_layer, MenuIndex* cell_index, void* data) {
    switch (cell_index->section) {
        case 0: ;
            switch (cell_index->row) {
                case 0:
                    if (t_power_status == POWER_STATUS_OFF) {
                        menu_cell_basic_draw(ctx, cell_layer, "Power.", "Turn on.", NULL);
                    } else {
                        menu_cell_basic_draw(ctx, cell_layer, "Power.", "Turn off.", NULL);
                    }
                    break;
                case 1:
                    if (t_mute_status) {
                        snprintf(volume_level_buffer, 32, "Muted.");
                    } else {
                        snprintf(volume_level_buffer, 32, "Volume : %ld.", t_sound_level);
                    }
                    menu_cell_basic_draw(ctx, cell_layer, "Volume.", volume_level_buffer, NULL);
                    break;
            }
            break;
        case 1:
            snprintf(source_buffer, 32, "Source : %s", t_current_source);
            menu_cell_basic_draw(ctx, cell_layer, "Change source.", source_buffer, NULL);
            break;
    }
}

static void menu_select_callback(MenuLayer* menu_layer, MenuIndex* cell_index, void* data) {
    switch (cell_index->section) {
        case 0:
            switch (cell_index->row) {
                case 0:
                    power_toggle();
                    break;
                case 1:
                    sound_change_action_bar_show();
                    break;
            }
            break;
        case 1:
            switch (cell_index->row) {
                case 0:
                    win_select_source_show();
                    break;
            }
            break;
        default:
            break;
    }
}

static void window_load (Window* window) {
    win_select_source_init ();

    Layer* window_layer = window_get_root_layer(window);
    GRect bounds = layer_get_frame(window_layer);

    s_menu_layer = menu_layer_create(bounds);
    menu_layer_set_callbacks(s_menu_layer, NULL, (MenuLayerCallbacks) {
        .get_num_sections = menu_get_num_sections_callback,
        .get_num_rows = menu_get_num_rows_callback,
        .get_header_height = menu_get_header_height_callback,
        .draw_header = menu_draw_header_callback,
        .draw_row = menu_draw_row_callback,
        .select_click = menu_select_callback,
        .get_cell_height = NULL,
    });

    menu_layer_set_click_config_onto_window(s_menu_layer, window);

    layer_add_child(window_layer, menu_layer_get_layer(s_menu_layer));
}

static void window_appear (Window* window) {
    send_request(GET, GET_BASIC_INFO);
}

static void window_unload (Window* window) {
    menu_layer_destroy(s_menu_layer);
}

void win_main_update (void) {
    if (s_menu_layer == NULL) {
        return;
    }

    /* switch (t_power_status) { */
    /*     case POWER_STATUS_ON: */
    /*         s_commands_menu_item[0].subtitle = "Turn off."; */
    /*         break; */
    /*     case POWER_STATUS_STANDBY: */
    /*     case POWER_STATUS_OFF: */
    /*         s_commands_menu_item[0].subtitle = "Turn on."; */
    /*         break; */
    /*     default: */
    /*         s_commands_menu_item[0].subtitle = "Undefined."; */
    /*         break; */
    /* } */

    /* if (t_mute_status) { */
    /*     snprintf(volume_level_buffer, 32, "Muted."); */
    /* } else { */
    /*     snprintf(volume_level_buffer, 32, "Volume : %ld.", t_sound_level); */
    /* } */
    /* s_commands_menu_item[1].subtitle =  volume_level_buffer; */

    /* snprintf(source_buffer, 32, "Source : %s", t_current_source); */
    /* s_other_menu_item[0].subtitle =  source_buffer; */

    layer_mark_dirty(menu_layer_get_layer(s_menu_layer));
    menu_layer_reload_data(s_menu_layer);
}

void win_main_show (void) {
    window_stack_push(s_window, true);
}

void win_main_init (void) {
    s_window = window_create();
    /* window_set_fullscreen (s_window, true); */

    volume_up_icon = gbitmap_create_with_resource(RESOURCE_ID_VOLUME_UP_LOGO);
    volume_down_icon = gbitmap_create_with_resource(RESOURCE_ID_VOLUME_DOWN_LOGO);
    volume_mute_icon = gbitmap_create_with_resource(RESOURCE_ID_VOLUME_MUTE_LOGO);

    window_set_window_handlers(s_window, (WindowHandlers) {
            .load = window_load,
            .appear = window_appear,
            .unload = window_unload,
    });
}

void win_main_deinit (void) {
    win_select_source_deinit();
}
