const DISCORD_TOKEN_STORAGE_KEY = 'kh1_discord_token';

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function decodeTokenPayload(token) {
    try {
        const payloadB64 = token.split('.')[0];
        const padded = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(padded));
    } catch (e) {
        return null;
    }
}

function getStoredDiscordToken() {
    const token = localStorage.getItem(DISCORD_TOKEN_STORAGE_KEY);
    if (!token) return null;
    const payload = decodeTokenPayload(token);
    if (!payload || (payload.exp && payload.exp * 1000 < Date.now())) {
        localStorage.removeItem(DISCORD_TOKEN_STORAGE_KEY);
        return null;
    }
    return token;
}

function captureDiscordTokenFromHash() {
    const match = window.location.hash.match(/token=([^&]+)/);
    if (match) {
        localStorage.setItem(DISCORD_TOKEN_STORAGE_KEY, decodeURIComponent(match[1]));
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
}

function renderDiscordAuthSection(containerEl, onChange) {
    const token = getStoredDiscordToken();
    if (!token) {
        const returnTo = encodeURIComponent(window.location.origin + window.location.pathname + window.location.search);
        containerEl.innerHTML = `<a class="discord-login" href="${FLASK_BASE_URL}/oauth/login?return_to=${returnTo}">Login with Discord</a>`;
        if (onChange) onChange(null);
        return;
    }

    const payload = decodeTokenPayload(token);
    const name = (payload && payload.discord_name) || 'Discord user';
    containerEl.innerHTML = `
        <span class="auth-status"><span class="status-dot"></span>Logged in as <strong>${escapeHtml(name)}</strong></span>
        <a href="#" id="discord-logout-link">Logout</a>`;
    containerEl.querySelector('#discord-logout-link').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem(DISCORD_TOKEN_STORAGE_KEY);
        renderDiscordAuthSection(containerEl, onChange);
    });
    if (onChange) onChange(token);
}
