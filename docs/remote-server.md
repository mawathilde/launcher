# Remote Download Server Configuration

This launcher has been configured to use a remote download server instead of GitHub releases. This provides more control over the update and distribution system.

## Server Requirements

The remote server must host the following files at `https://download.wizards-story.net/`:

### 1. Distribution Index
**File:** `distribution.json`

This file contains the server and module information for the launcher. See [distro.md](./distro.md) for the complete specification.

### 2. Release Information
**File:** `releases.json`

This file contains information about all releases, used for displaying release notes in the launcher.

**Format:**
```json
{
  "releases": [
    {
      "version": "v2.1.1",
      "title": "Version 2.1.1 Release",
      "changelog": "Release notes and changelog content here...",
      "url": "https://example.com/releases/v2.1.1"
    },
    {
      "version": "v2.1.0",
      "title": "Version 2.1.0 Release", 
      "changelog": "Previous release notes...",
      "url": "https://example.com/releases/v2.1.0"
    }
  ]
}
```

### 3. Update Metadata
**File:** `latest.yml`

This file is used by electron-updater to check for new versions. It follows the generic provider format.

**Format for Windows/Linux:**
```yaml
version: 2.1.1
files:
  - url: WizardsStoryLauncher-setup-2.1.1.exe
    sha512: <sha512-hash>
    size: 123456789
path: WizardsStoryLauncher-setup-2.1.1.exe
sha512: <sha512-hash>
releaseDate: '2024-01-15T10:00:00.000Z'
```

**For macOS** (optional, additional files):
- `latest-mac.yml` - for Intel Macs
- `latest-mac-arm64.yml` - for Apple Silicon Macs

### 4. Installer Files

The actual installer files must be available at the base URL:

- **Windows:** `WizardsStoryLauncher-setup-{version}.exe`
- **macOS Intel:** `WizardsStoryLauncher-setup-{version}-x64.dmg`
- **macOS ARM:** `WizardsStoryLauncher-setup-{version}-arm64.dmg`
- **Linux:** `WizardsStoryLauncher-setup-{version}.deb`

## Configuration

The remote server URLs are configured in `app/assets/js/remoteconfig.js`:

```javascript
exports.REMOTE_SERVER_BASE_URL = 'https://download.wizards-story.net'
exports.REMOTE_DISTRO_URL = `${exports.REMOTE_SERVER_BASE_URL}/distribution.json`
exports.REMOTE_RELEASES_URL = `${exports.REMOTE_SERVER_BASE_URL}/releases.json`
exports.REMOTE_LATEST_URL = `${exports.REMOTE_SERVER_BASE_URL}/latest.yml`
```

To change the remote server, simply update the `REMOTE_SERVER_BASE_URL` constant.

## Benefits of Remote Server System

1. **Full Control:** You control when and how updates are distributed
2. **No GitHub Dependency:** Works independently of GitHub's availability and rate limits
3. **Custom Release Notes:** Format and style release notes however you want
4. **Flexible Hosting:** Host on any web server or CDN
5. **Private Releases:** Keep your releases private if desired

## Migration Notes

This system replaces the previous GitHub-based update system which relied on:
- GitHub Releases API for update checking
- GitHub releases.atom feed for release notes
- GitHub release assets for downloads

All these dependencies have been removed in favor of the remote server system.
