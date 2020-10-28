const myLocalStorage = {
    save: (key,value)=> {
        const prevValue = JSON.parse(localStorage.getItem(key)) || [];
        const newValue = [...prevValue, value];
        localStorage.setItem(key, JSON.stringify(newValue));
        // console.log("in local");

    },
    get: (key)=> {
        let input = localStorage.getItem(key);
        if (input) {
            input = JSON.parse(input);
            return input;
            
        }

        
    },
    remove: (key)=> {
        localStorage.removeItem(key);
    }
}

export default myLocalStorage;