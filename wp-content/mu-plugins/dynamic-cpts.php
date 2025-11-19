<?php
/**
 * Plugin Name: Dynamic Custom Post Types
 * Description: Dynamically registers custom post types from database configurations
 * Version: 1.0.0
 * Author: WordPress
 * Author URI: https://wordpress.org
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// Prevent direct access to this file
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register custom post types dynamically from database
 *
 * This function queries the wp_options table for all entries with option_name
 * matching the pattern 'cpt_%_config' and registers each as a custom post type.
 *
 * @return void
 */
function dynamic_cpt_register_post_types() {
	global $wpdb;

	// Query for all custom post type configurations
	$option_name_pattern = 'cpt_%_config';
	$sql = $wpdb->prepare(
		"SELECT option_name, option_value FROM {$wpdb->options} WHERE option_name LIKE %s",
		$option_name_pattern
	);

	// Execute query with error handling
	$results = $wpdb->get_results( $sql );

	// Check for database errors
	if ( $wpdb->last_error ) {
		error_log( 'Dynamic CPT Error: ' . $wpdb->last_error );
		return;
	}

	// Check if we have any results
	if ( empty( $results ) || ! is_array( $results ) ) {
		return;
	}

	// Loop through each configuration and register post type
	foreach ( $results as $row ) {
		// Validate row data
		if ( empty( $row->option_name ) || empty( $row->option_value ) ) {
			continue;
		}

		// Extract post type slug from option_name (e.g., 'cpt_book_config' -> 'book')
		$slug = dynamic_cpt_extract_slug( $row->option_name );

		// Validate slug
		if ( empty( $slug ) || strlen( $slug ) > 20 ) {
			error_log( 'Dynamic CPT Error: Invalid slug extracted from ' . $row->option_name );
			continue;
		}

		// Unserialize configuration data
		$config = maybe_unserialize( $row->option_value );

		// Validate unserialized data
		if ( ! is_array( $config ) ) {
			error_log( 'Dynamic CPT Error: Invalid configuration for ' . $row->option_name );
			continue;
		}

		// Sanitize and validate configuration
		$config = dynamic_cpt_sanitize_config( $config );

		// Register the custom post type
		$result = register_post_type( $slug, $config );

		// Check for registration errors
		if ( is_wp_error( $result ) ) {
			error_log( 'Dynamic CPT Error: Failed to register ' . $slug . ' - ' . $result->get_error_message() );
		}
	}
}

/**
 * Extract post type slug from option name
 *
 * Converts 'cpt_slug_config' to 'slug'
 *
 * @param string $option_name The option name from database
 * @return string The extracted slug
 */
function dynamic_cpt_extract_slug( $option_name ) {
	// Remove 'cpt_' prefix and '_config' suffix
	$slug = str_replace( array( 'cpt_', '_config' ), '', $option_name );
	
	// Sanitize the slug
	$slug = sanitize_key( $slug );
	
	return $slug;
}

/**
 * Sanitize and validate custom post type configuration
 *
 * Ensures all configuration values are properly sanitized
 *
 * @param array $config The unserialized configuration array
 * @return array The sanitized configuration
 */
function dynamic_cpt_sanitize_config( $config ) {
	// Ensure config is an array
	if ( ! is_array( $config ) ) {
		return array();
	}

	// Sanitize common string fields
	$string_fields = array( 'label', 'description', 'menu_icon' );
	foreach ( $string_fields as $field ) {
		if ( isset( $config[ $field ] ) && is_string( $config[ $field ] ) ) {
			$config[ $field ] = sanitize_text_field( $config[ $field ] );
		}
	}

	// Ensure boolean fields are actual booleans
	$boolean_fields = array( 'public', 'has_archive', 'publicly_queryable', 'show_ui', 'show_in_menu', 'show_in_rest' );
	foreach ( $boolean_fields as $field ) {
		if ( isset( $config[ $field ] ) ) {
			$config[ $field ] = (bool) $config[ $field ];
		}
	}

	// Sanitize supports array
	if ( isset( $config['supports'] ) && is_array( $config['supports'] ) ) {
		$config['supports'] = array_map( 'sanitize_key', $config['supports'] );
	}

	// Sanitize taxonomies array
	if ( isset( $config['taxonomies'] ) && is_array( $config['taxonomies'] ) ) {
		$config['taxonomies'] = array_map( 'sanitize_key', $config['taxonomies'] );
	}

	// Allow developers to filter the sanitized config
	return apply_filters( 'dynamic_cpt_sanitize_config', $config );
}

// Hook into WordPress init action with priority 0 to register early
add_action( 'init', 'dynamic_cpt_register_post_types', 0 );
