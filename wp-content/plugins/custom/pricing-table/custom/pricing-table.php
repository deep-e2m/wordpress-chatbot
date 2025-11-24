<?php
/**
 * Plugin Name: Custom Pricing Table Block
 * Description: A customizable three-column pricing table with featured plan highlight.
 * Version: 1.0.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function create_pricing_table_block_init() {
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_pricing_table_block_init' );
