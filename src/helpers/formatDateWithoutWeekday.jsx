function formatDateWithoutWeekday(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default formatDateWithoutWeekday;