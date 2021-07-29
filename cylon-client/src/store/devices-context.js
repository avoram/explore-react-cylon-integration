import React, { useState, useEffect, useCallback } from 'react';

const DevicesContext = React.createContext({
    devices:[],
});

export const DevicesContextProvider = (props) => { 
    const contextValue = {
        devices:[]
    };
    
    return(
        <DevicesContext.Provider value={contextValue}>
            {props.children}
        </DevicesContext.Provider>
    )
}

export default DevicesContext;