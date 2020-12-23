export const oAUth2GoogleRefreshToken = (res) => {
  //TIMING TO RENEW ACCESS TOKEN
  let refreshTiming = (res.tokenObj.expires_at || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_at || 3600 - 5 * 60) * 1000;
    // console.log('newAuthRes', newAuthRes.id_token);

    //SET NEXT ONE AFTER FIRST REFRESH
    setTimeout(refreshToken, refreshTiming);
  };

  //SET THE FIRST REFRESH TIME ON 1h-5min
  setTimeout(refreshToken, refreshTiming);
};
