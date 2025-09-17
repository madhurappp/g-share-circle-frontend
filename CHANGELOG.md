# Changelog

## [v8] - 2025-09-16
**Stable release with working signup/login and email confirmation**

### Added
- Signup flow with Supabase authentication.
- Email confirmation handling via `/confirm` route.
- User-friendly messages for:
  - Successful confirmation.
  - Expired/invalid confirmation links.
- Loading state (animated button) for Signup button.

### Changed
- Switched from `HashRouter` back to `BrowserRouter` for clean URLs.
- Removed PKCE flow to simplify confirmation (now tokens handled via redirect).
- Updated redirect URL in Supabase to `http://localhost:5173/confirm`.

### Fixed
- Navbar navigation (Login/Signup toggling correctly).
- Landing page rendering issue (imports corrected).
- Confirm page no longer crashes with blank screen; displays friendly error messages.

### Notes
- Access token is still passed in confirmation link — this is expected behavior with Supabase; secure since tokens are short-lived.
- Next steps: UI/UX polish, possibly add better confirmation success pages and protected routes for logged-in users.
