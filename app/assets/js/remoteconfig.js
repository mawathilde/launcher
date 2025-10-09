/**
 * Remote server configuration
 * This file contains URLs for the remote download server
 */

// Base URL for the remote download server
exports.REMOTE_SERVER_BASE_URL = 'https://download.wizards-story.net'

// Distribution index URL
exports.REMOTE_DISTRO_URL = `${exports.REMOTE_SERVER_BASE_URL}/distribution.json`

// Release information URL (for release notes and update info)
exports.REMOTE_RELEASES_URL = `${exports.REMOTE_SERVER_BASE_URL}/releases.json`

// Latest release information URL
exports.REMOTE_LATEST_URL = `${exports.REMOTE_SERVER_BASE_URL}/latest.yml`
