export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            //to initilize the application
            return undefined;  

        }  // to convert to the seed object
        return JSON.parse(serializedState);  
    }   catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }   catch (err) {
        
    }
}