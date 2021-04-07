export function selectCoinLoading(reduxState) {
  return reduxState.coin.loading;
}

export function selectFeedCoins(reduxState) {
  return reduxState.coin.coins;
}