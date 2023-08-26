export function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate.replace(/(\d{4}-\d{2}-\d{2}), (\d{2}:\d{2})/, '$1T$2');
}