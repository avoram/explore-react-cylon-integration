import React from 'react';

const DevicesContext = React.createContext({
    devices:[],
    subdevices:[]
});

export const DevicesContextProvider = (props) => { 
    const contextValue = {
        devices:[],
        subdevices:[]
    };
    
    return(
        <DevicesContext.Provider value={contextValue}>
            {props.children}
        </DevicesContext.Provider>
    )
}

export default DevicesContext;