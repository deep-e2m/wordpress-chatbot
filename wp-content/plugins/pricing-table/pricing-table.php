<?php
/**
 * Plugin Name: Custom/pricing Table Block
 * Description: customizable pricing block for WordPress that features three equal columns. Each column should hold 
 * Version: 1.0.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function custom/pricing_table_block_init() {
    $block_path = __DIR__ . '/build';
    if ( file_exists( $block_path . '/block.json' ) ) {
        register_block_type( $block_path );
    }
}
add_action( 'init', 'custom/pricing_table_block_init' );
