import BaseUrl from './BaseUrl';

export default Endpoints = {
  // Auth API
  EndpointsaccountSignUp: BaseUrl.BaseUrl + 'User/Signup',
  EndpointsaccountSignIn: BaseUrl.BaseUrl + 'User/Login',
  EndpointsRequestResetPasswordCode: BaseUrl.BaseUrl + 'User/RequestResetPasswordCode',
  EndpointsValidateResetCode: BaseUrl.BaseUrl + 'User/ValidateResetCode',
  EndpointsResetPassword: BaseUrl.BaseUrl + 'User/ResetPassword',
  EndpointsChangePassword: BaseUrl.BaseUrl + 'User/ChangePassword',
  EndpointsEditProfile: BaseUrl.BaseUrl + 'User/EditProfile',
  // Auth API END
  
  // Home API
  EndpointsHomeScreen: BaseUrl.BaseUrl + 'product/HomeScreen',
  EndpointsGetProductDetails: BaseUrl.BaseUrl + 'product/GetProductDetails',
  EndpointsGetAllProductsBySubcategory: BaseUrl.BaseUrl + 'product/GetAllProductsBySubcategory',
  EndpointsGetProductDetails: BaseUrl.BaseUrl + 'product/GetProductDetails',
  EndpointsGetCategriesItemCounts: BaseUrl.BaseUrl + 'product/GetCategriesItemCounts',
  EndpointsGetFilters: BaseUrl.BaseUrl + 'product/GetFilters',
  EndpointsAddReview: BaseUrl.BaseUrl + 'product/AddReview',
  // Home API END

  // Home API
  EndpointsAddToWishList: BaseUrl.BaseUrl + 'product/AddToWishList',
  EndpointsRemoveFromWishList: BaseUrl.BaseUrl + 'product/RemoveFromWishList',
  EndpointsGetUserWishList: BaseUrl.BaseUrl + 'product/GetUserWishList',
  // Home API END
 
  // ADDRESS API
  EndpointsAddEditAddresss: BaseUrl.BaseUrl + 'User/AddEditAddresss',
  EndpointsGetAddresses: BaseUrl.BaseUrl + 'User/GetAddresses',
  EndpointsDeleteAddress: BaseUrl.BaseUrl + 'User/DeleteAddress',
  
  // ADDRESS API END
    
  // ORDER API
  EndpointsGetOrders: BaseUrl.BaseUrl + 'Order/GetOrders',
  EndpointsGetOrderDetails: BaseUrl.BaseUrl + 'Order/GetOrderDetails',
  EndpointsValidateCoupon: BaseUrl.BaseUrl + 'Order/ValidateCoupon',
  EndpointsCreateOrder: BaseUrl.BaseUrl + 'Order/CreateOrder',
  // ORDERAS API END
    
 
};
