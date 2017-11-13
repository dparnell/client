// @flow
import * as Constants from '../constants/signup'
import * as SignupGen from '../actions/signup-gen'

export default function(
  state: Constants.State = Constants.initialState,
  action: SignupGen.Actions
): Constants.State {
  switch (action.type) {
    case SignupGen.resetStore: // fallthrough
    case SignupGen.resetSignup:
      return {...Constants.initialState}

    case SignupGen.waiting:
      const {waiting} = action.payload
      return {...state, waiting}

    case SignupGen.checkInviteCode:
      if (action.error) {
        const {errorText} = action.payload
        return {
          ...state,
          inviteCodeError: errorText,
        }
      } else {
        const {inviteCode} = action.payload
        return {
          ...state,
          inviteCode,
          inviteCodeError: null,
          phase: 'usernameAndEmail',
        }
      }

    case SignupGen.checkUsernameEmail:
      const {username, email} = action.payload
      if (action.error) {
        const {emailError, usernameError} = action.payload
        return {
          ...state,
          email,
          emailError,
          username,
          usernameError,
        }
      } else {
        return {
          ...state,
          email,
          emailError: null,
          phase: 'passphraseSignup',
          username,
          usernameError: null,
        }
      }

    case SignupGen.startRequestInvite:
      return {
        ...state,
        phase: 'requestInvite',
      }

    case SignupGen.requestInvite:
      if (action.error) {
        const {emailError, nameError, email, name} = action.payload
        return {
          ...state,
          email,
          emailError,
          name,
          nameError,
        }
      } else {
        const {email, name} = action.payload
        return {
          ...state,
          email,
          name,
          phase: 'requestInviteSuccess',
        }
      }

    case SignupGen.checkPassphrase:
      if (action.error) {
        const {passphraseError} = action.payload
        return {
          ...state,
          passphraseError,
        }
      } else {
        const {passphrase} = action.payload
        return {
          ...state,
          passphrase,
          passphraseError: null,
          phase: 'deviceName',
        }
      }
    case SignupGen.setDeviceNameError:
      const {deviceNameError} = action.payload
      return {
        ...state,
        deviceNameError,
      }
    case SignupGen.clearDeviceNameError:
      return {
        ...state,
        deviceNameError: null,
      }
    case SignupGen.submitDeviceName:
      if (action.error) {
        const {deviceNameError} = action.payload
        return {
          ...state,
          deviceNameError,
        }
      } else {
        const {deviceName} = action.payload
        return {
          ...state,
          deviceName,
          deviceNameError: null,
          phase: 'signupLoading',
        }
      }

    case SignupGen.showPaperKey:
      if (action.error) {
        console.warn('Should not get an error from showing paper key')
        return state
      } else {
        const {paperkey} = action.payload
        return {
          ...state,
          paperkey,
          phase: 'success',
        }
      }

    case SignupGen.showSuccess:
      if (action.error) {
        console.warn('Should not get an error from showing success')
        return state
      } else {
        return {
          ...state,
          phase: 'success',
        }
      }

    case SignupGen.signup:
      if (action.error) {
        return {
          ...state,
          phase: 'signupError',
          signupError: action.payload.signupError,
        }
      } else {
        return state
      }

    case SignupGen.restartSignup:
      return {
        ...state,
        inviteCodeError: null,
        passphraseError: null,
        phase: 'inviteCode',
      }
  }
  return state
}
