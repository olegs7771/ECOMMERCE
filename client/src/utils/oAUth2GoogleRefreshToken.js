export const oAUth2GoogleRefreshToken = (response) => {
  //TIMING TO RENEW ACCESS TOKEN
  // let refreshTiming = response.tokenObj.expires_at * 1000;
  // let refreshTiming = 5 * 1000;

  const refreshToken = async () => {
    const newAuthRes = await response.reloadAuthResponse();
    console.log('newAuthRes.expires_at', new Date(newAuthRes.expires_at));
    // refreshTiming = newAuthRes.expires_at * 1000;

    // console.log('refreshTiming 2', new Date(refreshTiming) / 1000);
    //SET NEXT ONE AFTER FIRST REFRESH
    setTimeout(refreshToken, 3595000);
  };

  //SET THE FIRST REFRESH TIME ON 1h-5min
  setTimeout(refreshToken, 3595000);
};
