import React from 'react';

const UsersContext = React.createContext();
export const Provider = UsersContext.Provider;
export const Consumer = UsersContext.Consumer;
export default UsersContext;