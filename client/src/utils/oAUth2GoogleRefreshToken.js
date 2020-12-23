export const oAUth2GoogleRefreshToken = (res) => {
  //TIMING TO RENEW ACCESS TOKEN
  let refreshTiming = (res.tokenObj.expires_at || 3600 - 5 * 60) * 1000;

  console.log('res.tokenObj.expires_at', res.tokenObj.expires_at);
  console.log('refreshTiming1', refreshTiming);
  console.log('res.tokenObj.expires_at', new Date(res.tokenObj.expires_at));
  console.log('refreshTiming1', new Date(refreshTiming / 1000));

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    console.log('newAuthRes', newAuthRes);
    refreshTiming = (newAuthRes.expires_at || 3600 - 5 * 60) * 1000;
    // console.log('newAuthRes', newAuthRes.id_token);
    console.log('refreshTiming 2', new Date(refreshTiming) / 1000);
    //SET NEXT ONE AFTER FIRST REFRESH
    // setTimeout(refreshToken, refreshTiming);
  };

  //SET THE FIRST REFRESH TIME ON 1h-5min
  setTimeout(refreshToken, 5000);
};
