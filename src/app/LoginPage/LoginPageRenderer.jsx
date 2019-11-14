import React from 'react'
import styled from 'styled-components'
import { Tab, Tabs, Button, Dialog } from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'

import { TmColors, Link as ExternalLink } from '../../components/Common'
import { Link } from "react-router-dom"
import MetaMask from '../../components/MetaMask'
import SelectHdPathModal from '../../components/SelectHdPathModal'
import appTomoLogoUrl from '../../assets/images/app_tomo_logo.svg'
import TrezorWallet from '../../components/TrezorWallet'
import PrivateKeyWallet from '../../components/PrivateKeyWallet'
import MnemonicWallet from '../../components/MnemonicWallet'

type Props = {
  selectedTabId: string,
  handleTabChange: void => void,
  privateKeyStatus: string,
  privateKey: string,
  mnemonicStatus: string,
  mnemonic: string,
  handlePrivateKeyChange: void => void, 
  unlockWalletWithPrivateKey: void => void,
  handleMnemonicChange: void => void,
  unlockWalletWithMnemonic: void => void,
  password: string,
  handlePasswordChange: void => void,
  unlockWalletWithMetaMask: void => void,
  error: object,
}

class LoginPageRenderer extends React.PureComponent<Props> {

  render() {
    const {
      selectedTabId,
      handleTabChange,
      addressActive,
      addresses,
      isOpenAddressesDialog,
      toggleAddressesDialog,
      isOpenSelectHdPathModal,
      toggleSelectHdPathModal,
      handleHdPathChange,
      indexHdPathActive,
      hdPaths,
      connectToLedger,
      nextAddresses,
      prevAddresses,
      ledgerError,
      errorList,
      loading,
      chooseAddress,
      unlockWalletWithLedger,
    } = this.props

    return (
      <Wrapper>
          <HeaderTitle><FormattedMessage id="unlockWalletPage.title" /></HeaderTitle>
          <SubTitle><FormattedMessage id="unlockWalletPage.subTitlePart1" /> <LinkWrapper to="/create"><FormattedMessage id="unlockWalletPage.subTitlePart2" /></LinkWrapper></SubTitle>

          <TabsWrapper 
            id="import-list" 
            onChange={handleTabChange} 
            selectedTabId={selectedTabId}
            renderActiveTabPanelOnly={true}>
            <Tab id="ledger" title="Ledger Nano S" panel={
              <LedgerDevice 
                addressActive={addressActive}
                addresses={addresses}
                isOpenAddressesDialog={isOpenAddressesDialog}
                toggleAddressesDialog={toggleAddressesDialog}
                isOpenSelectHdPathModal={isOpenSelectHdPathModal}
                toggleSelectHdPathModal={toggleSelectHdPathModal}
                unlockWalletWithLedger={unlockWalletWithLedger}
                handleHdPathChange={handleHdPathChange}
                indexHdPathActive={indexHdPathActive}
                hdPaths={hdPaths}
                connectToLedger={connectToLedger}
                nextAddresses={nextAddresses}
                prevAddresses={prevAddresses}
                ledgerError={ledgerError}
                errorList={errorList}
                loading={loading}
                chooseAddress={chooseAddress} />
            } />
            <Tab id="metamask" title="MetaMask" panel={<MetaMask />} />
            <Tab id="trezor" title="Trezor" panel={<TrezorWallet />} />
            <Tab id="private-key" title="Private Key" panel={<PrivateKeyWallet />} />
            <Tab id="seed-phrase" title="Mnemonic Phrase" panel={<MnemonicWallet />} />            
          </TabsWrapper>
      </Wrapper>
    )
  }
}

const LedgerDevice = (props) => {
  const { 
    addressActive,
    addresses, 
    isOpenAddressesDialog,
    toggleAddressesDialog,
    isOpenSelectHdPathModal,
    toggleSelectHdPathModal,
    unlockWalletWithLedger,
    handleHdPathChange,
    indexHdPathActive,
    hdPaths,
    connectToLedger,
    prevAddresses,
    nextAddresses,
    ledgerError,
    errorList,
    loading,
    chooseAddress,
  } = props

  return (
    <WalletWrapper>
      <Title><FormattedMessage id="unlockWalletPage.ledger.instruction1" /></Title>

      <LedgerImageBox>       
        <LedgerImageBody>
          <LedgerScreen>
            <PasswordSymbol>******</PasswordSymbol>            
          </LedgerScreen>
          <LedgerCircle />
        </LedgerImageBody>

        <LedgerImageHead />
      </LedgerImageBox>

      <Title><FormattedMessage id="unlockWalletPage.ledger.instruction2" /></Title>

      <LedgerImageBox>       
        <LedgerImageBody>
          <LedgerScreen>
            <img src={appTomoLogoUrl} alt="app Tomo logo"/>          
          </LedgerScreen>
          <LedgerCircle />
        </LedgerImageBody>

        <LedgerImageHead />
      </LedgerImageBox>

      <InstructionBox>
        <ExternalLink href="https://docs.tomochain.com/" target="_blank" color={TmColors.ORANGE}><FormattedMessage id="unlockWalletPage.connectionIssues" /></ExternalLink>
        <ExternalLink href="https://docs.tomochain.com/" target="_blank" color={TmColors.ORANGE}><FormattedMessage id="unlockWalletPage.instructions" /></ExternalLink>
      </InstructionBox>

      <ButtonWrapper onClick={() => toggleSelectHdPathModal('open')}><FormattedMessage id="unlockWalletPage.ledger.buttonTitle" /></ButtonWrapper>

      <SelectHdPathModal
        isOpen={isOpenSelectHdPathModal}
        onClose={toggleSelectHdPathModal}
        connect={connectToLedger}
        onHdPathChange={handleHdPathChange}
        hdPaths={hdPaths}
        indexActive={indexHdPathActive}
        error={ledgerError}
        errorList={errorList}
        loading={loading} />
      
      <AddressesDialog 
        addressActive={addressActive}
        addresses={addresses}
        isOpenAddressesDialog={isOpenAddressesDialog}
        onClose={toggleAddressesDialog}
        connectToLedger={connectToLedger}
        unlockWalletWithLedger={unlockWalletWithLedger}
        prevAddresses={prevAddresses}
        nextAddresses={nextAddresses}
        handleHdPathChange={handleHdPathChange}
        hdPaths={hdPaths}
        indexHdPathActive={indexHdPathActive}
        ledgerError={ledgerError}
        errorList={errorList}
        chooseAddress={chooseAddress} />
    </WalletWrapper>
  )
}

class AddressesDialog extends React.PureComponent {

  render() {
    const { 
      addressActive,
      addresses, 
      unlockWalletWithLedger, 
      isOpenAddressesDialog, 
      onClose,
      nextAddresses,
      prevAddresses,
      chooseAddress,
    } = this.props

    return (
      <Dialog
        className="dark-dialog"
        onClose={onClose}
        title="Choose Address"
        canOutsideClickClose={false}
        isOpen={isOpenAddressesDialog}>

        {(addresses.length > 0) && (
          <React.Fragment>
            <AddressWrapper>
              <div>Please choose an address to use:</div>
              <AddressListBox addressActive={addressActive} addresses={addresses} chooseAddress={chooseAddress} />
            </AddressWrapper>

            <NavigatorBox>
              <NavigatorItem onClick={prevAddresses}>&lt; Previous</NavigatorItem> 
              <NavigatorItem onClick={nextAddresses}>Next &gt;</NavigatorItem>
            </NavigatorBox>

            <ButtonWrapper disabled={!addressActive} onClick={unlockWalletWithLedger}><FormattedMessage id="unlockWalletPage.unlockWallet" /></ButtonWrapper>
          </React.Fragment>
        )}      
      </Dialog>
    )
  }
}

const AddressListBox = (props) => {
  const { addressActive, addresses, chooseAddress } = props

  const addressItems = addresses.map((address) => {

    if (addressActive && addressActive.addressString === address.addressString) {
      return (
        <AddressItemActive key={ address.index }
          onClick={() => chooseAddress(address)}>
          <div>{address.index + 1}. {address.addressString}</div>
          <div>{address.balance}</div>
        </AddressItemActive>
      )
    }

    return (
      <AddressItem key={ address.index }
        onClick={() => chooseAddress(address)}>
        <div>{address.index + 1}. {address.addressString}</div>
        <div>{address.balance}</div>
      </AddressItem>
    )
  })

  return (
    <AddressList>
      { addressItems }
    </AddressList>
  )
}

export default LoginPageRenderer

const Wrapper = styled.div`
  margin-top: 50px;
`

const TabsWrapper = styled(Tabs)`
  margin-top: 35px;

  .bp3-tab-list {
    justify-content: center;

    .bp3-tab {
      margin: 0 10px
      padding: 0 10px;
      user-select: none;
    }

    .bp3-tab-indicator-wrapper {
      display: block;


      .bp3-tab-indicator {
        height: 2px;
        background-color: ${TmColors.ORANGE};
      }
    }

    .bp3-tab {
      color: ${TmColors.LIGHT_GRAY};
    }

    .bp3-tab[aria-selected="true"],
    .bp3-tab:hover {
      color: ${TmColors.WHITE};
    }
  }

  .bp3-tab-panel {
    padding: 45px 25px 30px;
  }
`

const WalletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 395px;
  margin: 0 auto;
`

const HeaderTitle = styled.h1`
  color: ${TmColors.WHITE};
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  line-height: 24px;
`

const LinkWrapper = styled(Link)`
  color: ${TmColors.ORANGE};

  &:hover {
    color: ${TmColors.DARK_ORANGE};
  }
`

const SubTitle = styled.div`
  text-align: center;
`


const ButtonWrapper = styled(Button)`
  display: block;
  margin-top: ${props => props.margintop ? props.margintop : '45px'};
  margin-left: auto;
  margin-right: auto;
  width: ${props => props.width ? props.width : '100%'};
  text-align: center;
  color: ${TmColors.BLACK} !important;
  border-radius: 0;
  background-color: ${TmColors.ORANGE} !important;
  box-shadow: none !important;
  background-image: none !important;
  height: 40px;
  &:hover {
    background-color: ${TmColors.DARK_ORANGE} !important;
  }

  &.bp3-disabled {
    cursor: default !important;
    background-color: ${TmColors.GRAY} !important;
  }

  .bp3-spinner {
    display: inline-block;
    margin-left: 5px;
  }
`


const Title = styled.div`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color ? props.color : 'inherit'}
  cursor: ${props => props.cursor ? props.cursor : 'initial'};
`

const LedgerImageBox = styled.div`
  position: relative;
  padding-left: 16px;
  width: 162px;
  margin-top: 20px;
  margin-bottom: 40px;
`

const LedgerImageBody = styled.div`
  width: 146px;
  height: 41px;
  border-radius: 6px;
  background-color: ${TmColors.BLACK};
`

const LedgerImageHead = styled.div`
  width: 16px;
  height: 18px;
  background-color: ${TmColors.LIGHT_BLUE};
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  &::before,
  &::after {
    content: " ";
    width: 9px;
    height: 3px;
    display: inline-block;
    background-color: ${TmColors.BLACK};
    position: absolute;
    left: 4px;
    top: 4px;
  }

  &::after {
    top: 11px;
  }
`

const LedgerScreen = styled.div`
  width: 85px;
  height: 18px;
  text-align: center;
  background-color: ${TmColors.LIGHT_BLUE};
  position: absolute;
  left: 35px;
  top: 50%;
  transform: translateY(-50%);
`

const LedgerCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${TmColors.LIGHT_BLUE};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
`

const PasswordSymbol = styled.span`
  display: inline-block;
  padding-top: 3px;
  color: ${TmColors.ORANGE};
`

const InstructionBox = styled.div`
  width: 100%;  
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
`

const AddressWrapper = styled.div``

const AddressList = styled.ul`
  height: 175px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 10px;
`

const AddressItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;

  &:nth-child(2n+1) {
    background-color: ${TmColors.BLACK};
  }

  &:hover {
    background-color: ${TmColors.BLUE};
  }
`

const AddressItemActive = styled(AddressItem)`
  color: ${TmColors.ORANGE};
`

const NavigatorBox = styled.div`
  display: flex;
  justify-content: center;
`

const NavigatorItem = styled.span`
  margin: 0 10px;
  user-select: none;
  cursor: pointer;

  &:hover {
    color: ${TmColors.ORANGE};
  }
`

