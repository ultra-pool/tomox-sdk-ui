import { connect } from 'react-redux'
import {
  updateTimeSpan,
} from '../../store/models/ohlcv'
import { 
  getTokenPairsDomain,
  getOhlcvDomain,
  getSettingsDomain,
} from '../../store/domains'
import type { State } from '../../types'

export const mapStateToProps = (state: State) => {
  const ohlcvDomain = getOhlcvDomain(state)
  const ohlcv = ohlcvDomain.getState()
  const currentPair = getTokenPairsDomain(state).getCurrentPair()
  const currentPairData = getTokenPairsDomain(state).getCurrentPairData()
  const pricePrecision = currentPairData ? currentPairData.pricePrecision : null
  const settingsDomain = getSettingsDomain(state)
  const mode = settingsDomain.getMode()
  const locale = settingsDomain.getLocale()

  return {
    ohlcv,
    currentPair: { ...currentPair, pricePrecision },
    mode,
    locale,
  }
}

export const mapDispatchToProps = {
  updateTimeSpan,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
