const NOMINATION_LOCAL_KEY = `ts_nominations`;

// Get nominations from local storage
export const getLocalNominations = () => {
    const nominations = localStorage.getItem(NOMINATION_LOCAL_KEY);
    return nominations ? JSON.parse(nominations) : [];
}

// Set nominations from local storage
export const setLocalNominations = (nominations) => {
    localStorage.setItem(NOMINATION_LOCAL_KEY, JSON.stringify(nominations));
}
