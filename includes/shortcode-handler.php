<?php
/**
 * Orbit Tabs Shortcode Handler
 * Renders the HTML structure for the Polaroid Tabs component
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render Orbit Tabs component
 *
 * @param array $atts Shortcode attributes
 * @return string HTML output
 */
function orbit_customs_render_tabs($atts)
{
    // Parse attributes with defaults
    $atts = shortcode_atts(
        array(
            'id' => 'orbit-tabs-' . uniqid(),
        ),
        $atts,
        'orbit_tabs'
    );

    // Generate unique ID for this instance
    $container_id = sanitize_html_class($atts['id']);

    // Default demo content
    $tabs = orbit_customs_get_default_tabs();

    // Start output buffering
    ob_start();
    ?>

    <div class="orbit-tabs-container" id="<?php echo esc_attr($container_id); ?>">
        <div class="orbit-tabs-wrapper">

            <!-- Left Column (Odd Tabs) -->
            <div class="orbit-tabs-left" role="tablist"
                aria-label="<?php esc_attr_e('Orbit Tabs Navigation', 'orbit-customs'); ?>">
                <?php
                foreach ($tabs as $index => $tab) {
                    if ($index % 2 === 0) { // Odd tabs (0, 2, 4...)
                        orbit_customs_render_tab_button($tab, $index, $container_id);
                    }
                }
                ?>
            </div>

            <!-- Central Stage (Content Area) -->
            <div class="orbit-tabs-stage">
                <?php
                foreach ($tabs as $index => $tab) {
                    orbit_customs_render_tab_content($tab, $index, $container_id);
                }
                ?>
            </div>

            <!-- Right Column (Even Tabs) -->
            <div class="orbit-tabs-right" role="tablist"
                aria-label="<?php esc_attr_e('Orbit Tabs Navigation', 'orbit-customs'); ?>">
                <?php
                foreach ($tabs as $index => $tab) {
                    if ($index % 2 !== 0) { // Even tabs (1, 3, 5...)
                        orbit_customs_render_tab_button($tab, $index, $container_id);
                    }
                }
                ?>
            </div>

        </div>
    </div>

    <?php
    return ob_get_clean();
}

/**
 * Render a single tab button
 *
 * @param array  $tab Tab data
 * @param int    $index Tab index
 * @param string $container_id Container ID
 */
function orbit_customs_render_tab_button($tab, $index, $container_id)
{
    $button_id = $container_id . '-tab-' . $index;
    $panel_id = $container_id . '-panel-' . $index;
    ?>
    <button id="<?php echo esc_attr($button_id); ?>" class="orbit-tab-button" role="tab" aria-selected="false"
        aria-controls="<?php echo esc_attr($panel_id); ?>" tabindex="-1">
        <?php echo esc_html($tab['title']); ?>
    </button>
    <?php
}

/**
 * Render a single tab content panel
 *
 * @param array  $tab Tab data
 * @param int    $index Tab index
 * @param string $container_id Container ID
 */
function orbit_customs_render_tab_content($tab, $index, $container_id)
{
    $button_id = $container_id . '-tab-' . $index;
    $panel_id = $container_id . '-panel-' . $index;
    ?>
    <div id="<?php echo esc_attr($panel_id); ?>" class="orbit-tab-content" role="tabpanel"
        aria-labelledby="<?php echo esc_attr($button_id); ?>" aria-hidden="true">
        <div class="orbit-polaroid-stack">
            <?php
            if (!empty($tab['images'])) {
                foreach ($tab['images'] as $img_index => $image) {
                    orbit_customs_render_polaroid($image, $img_index);
                }
            }
            ?>
        </div>
    </div>
    <?php
}

/**
 * Render a single Polaroid image
 *
 * @param array $image Image data
 * @param int   $index Image index
 */
function orbit_customs_render_polaroid($image, $index)
{
    ?>
    <div class="orbit-polaroid">
        <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" loading="lazy">
        <?php if (!empty($image['cta_text']) && !empty($image['cta_link'])): ?>
            <a href="<?php echo esc_url($image['cta_link']); ?>" class="orbit-polaroid-cta" target="_blank"
                rel="noopener noreferrer">
                <?php echo esc_html($image['cta_text']); ?>
            </a>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * Get default demo tabs data
 *
 * @return array Default tabs configuration
 */
function orbit_customs_get_default_tabs()
{
    $placeholder_base = 'https://via.placeholder.com/';

    return array(
        array(
            'title' => __('Creative Design', 'orbit-customs'),
            'images' => array(
                array(
                    'url' => $placeholder_base . '400x500/2196F3/FFFFFF?text=Design+1',
                    'alt' => __('Creative Design 1', 'orbit-customs'),
                    'cta_text' => __('View Project', 'orbit-customs'),
                    'cta_link' => '#',
                ),
                array(
                    'url' => $placeholder_base . '400x500/1976D2/FFFFFF?text=Design+2',
                    'alt' => __('Creative Design 2', 'orbit-customs'),
                    'cta_text' => '',
                    'cta_link' => '',
                ),
            ),
        ),
        array(
            'title' => __('Development', 'orbit-customs'),
            'images' => array(
                array(
                    'url' => $placeholder_base . '400x500/4CAF50/FFFFFF?text=Code+1',
                    'alt' => __('Development 1', 'orbit-customs'),
                    'cta_text' => __('Learn More', 'orbit-customs'),
                    'cta_link' => '#',
                ),
            ),
        ),
        array(
            'title' => __('Marketing', 'orbit-customs'),
            'images' => array(
                array(
                    'url' => $placeholder_base . '400x500/FF9800/FFFFFF?text=Marketing+1',
                    'alt' => __('Marketing 1', 'orbit-customs'),
                    'cta_text' => __('Explore', 'orbit-customs'),
                    'cta_link' => '#',
                ),
                array(
                    'url' => $placeholder_base . '400x500/FF5722/FFFFFF?text=Marketing+2',
                    'alt' => __('Marketing 2', 'orbit-customs'),
                    'cta_text' => '',
                    'cta_link' => '',
                ),
                array(
                    'url' => $placeholder_base . '400x500/F44336/FFFFFF?text=Marketing+3',
                    'alt' => __('Marketing 3', 'orbit-customs'),
                    'cta_text' => '',
                    'cta_link' => '',
                ),
            ),
        ),
        array(
            'title' => __('Photography', 'orbit-customs'),
            'images' => array(
                array(
                    'url' => $placeholder_base . '400x500/9C27B0/FFFFFF?text=Photo+1',
                    'alt' => __('Photography 1', 'orbit-customs'),
                    'cta_text' => __('Gallery', 'orbit-customs'),
                    'cta_link' => '#',
                ),
            ),
        ),
    );
}
