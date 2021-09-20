import React from 'react';

const DevicesContext = React.createContext({
    selectedRobots: {},
    allPlatforms: [],
    allDevices: []
});

export const DevicesContextProvider = (props) => {
    const contextValue = {
        selectedRobots: {},
        allPlatforms: [],
        allDevices: []
    };

    return (
        <DevicesContext.Provider value={contextValue}>
            {props.children}
        </DevicesContext.Provider>
    )
}

export default DevicesContext;