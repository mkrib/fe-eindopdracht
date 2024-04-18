function formatTimeWithoutSeconds(time) {
    const dateObj = new Date(`2000-01-01T${time}`);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export default formatTimeWithoutSeconds;