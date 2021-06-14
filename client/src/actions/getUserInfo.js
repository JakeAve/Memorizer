const getUserInfo = async (token) => {
    try {
        const response = await fetch(`/api/user`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();
        if (response.ok) return { success: true, data: result };
        else return { success: false, data: result };
    } catch (err) {
        console.error(err);
        window.alert('An unexpected error has occured');
    }
};

export default getUserInfo;
