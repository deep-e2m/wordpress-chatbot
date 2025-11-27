<?php
/**
 * Plugin Name: Custom/testimonial Carousel Block
 * Description: testimonial carousel with three visible slides, autoplay with configurable speed and pause-on-hover,
 * Version: 1.0.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function custom/testimonial_carousel_block_init() {
    $block_path = __DIR__ . '/build';
    if ( file_exists( $block_path . '/block.json' ) ) {
        register_block_type( $block_path );
    }
}
add_action( 'init', 'custom/testimonial_carousel_block_init' );
