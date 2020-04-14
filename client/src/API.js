const API_SERVER_URL = 'http://localhost:1450';

export async function listLogEntries() {
    const logEntries = await fetch(`${API_SERVER_URL}/api/logs`);
    return logEntries.json();
}
