const Query = require('./Query');
const MobileDevice = require('./MobileDevice');
const Policy = require('./Policy');
const MobileSecurityInfo = require('./MobileSecurityInfo');

// export const resolvers = { 
//                           Query, 
//                           MobileDevice, 
//                           Policy, 
//                           MobileSecurityInfo
//                          };

export const resolvers = { 
                            Query, 
                            Device: {
                              __resolveType(){
                                return 'MobileDevice';
                              },
                            },
                            MobileDevice, 
                            PolicyResult: {
                              __resolveType(){
                                return 'MobilePolicyResult';
                              },
                            },
                            Policy, 
                            SecurityInfo: {
                              __resolveType(){
                                return 'MobileSecurityInfo';
                              },
                            },
                            MobileSecurityInfo 
                          };
