import React from 'react';

const DevicesContext = React.createContext({
    devices:[],
    subdevices:[],
    platforms: {}
});

export const DevicesContextProvider = (props) => { 
    const contextValue = {
        devices:[],
        subdevices:[],
        platforms: {}
    };
    
    return(
        <DevicesContext.Provider value={contextValue}>
            {props.children}
        </DevicesContext.Provider>
    )
}

export default DevicesContext;