<?php
/**
 * Plugin Name: Orbit Customs
 * Plugin URI: https://joandev.com/orbit-customs
 * Description: Custom visual components including Polaroid Tabs with stunning animations and Elementor integration
 * Author: Joan Dev & Tech
 * Version: 1.0.5
 * Author URI: https://joandev.com
 * Text Domain: orbit-customs
 * License: GPLv2 or later
 * Requires at least: 5.0
 * Tested up to: 6.8
 * Requires PHP: 7.3
 * Location: Galiza, Spain
 * Update URI: https://joandev.com/orbit-customs
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('ORBIT_CUSTOMS_VERSION', '1.0.5');
define('ORBIT_CUSTOMS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ORBIT_CUSTOMS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main Orbit Customs Class
 */
class Orbit_Customs
{

    /**
     * Instance of this class
     */
    private static $instance = null;

    /**
     * Get instance
     */
    public static function get_instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct()
    {
        $this->init_hooks();
    }

    /**
     * Initialize hooks
     */
    private function init_hooks()
    {
        add_action('plugins_loaded', array($this, 'load_textdomain'));
        add_action('wp_enqueue_scripts', array($this, 'register_assets'));
        add_action('elementor/frontend/after_register_scripts', array($this, 'register_assets'));
        add_action('elementor/editor/before_enqueue_scripts', array($this, 'register_assets'));
        add_action('elementor/widgets/register', array($this, 'register_elementor_widgets'));
        add_shortcode('orbit_tabs', array($this, 'orbit_tabs_shortcode'));
    }

    /**
     * Load plugin textdomain
     */
    public function load_textdomain()
    {
        load_plugin_textdomain('orbit-customs', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }

    /**
     * Register assets (but don't enqueue yet)
     */
    public function register_assets()
    {
        wp_register_style(
            'orbit-tabs',
            ORBIT_CUSTOMS_PLUGIN_URL . 'assets/css/orbit-tabs.css',
            array(),
            ORBIT_CUSTOMS_VERSION
        );

        wp_register_script(
            'orbit-tabs',
            ORBIT_CUSTOMS_PLUGIN_URL . 'assets/js/orbit-tabs.js',
            array('jquery'),
            ORBIT_CUSTOMS_VERSION,
            true
        );
    }

    /**
     * Register Elementor widgets
     */
    public function register_elementor_widgets($widgets_manager)
    {
        if (!did_action('elementor/loaded')) {
            return;
        }

        require_once ORBIT_CUSTOMS_PLUGIN_DIR . 'includes/elementor-widget.php';
        $widgets_manager->register(new \Orbit_Customs\Elementor_Orbit_Tabs_Widget());
    }

    /**
     * Orbit Tabs Shortcode
     */
    public function orbit_tabs_shortcode($atts)
    {
        // Enqueue assets only when shortcode is used
        wp_enqueue_style('orbit-tabs');
        wp_enqueue_script('orbit-tabs');

        // Include shortcode handler
        require_once ORBIT_CUSTOMS_PLUGIN_DIR . 'includes/shortcode-handler.php';
        return orbit_customs_render_tabs($atts);
    }
}

/**
 * Initialize the plugin
 */
function orbit_customs_init()
{
    return Orbit_Customs::get_instance();
}

// Start the plugin
orbit_customs_init();
