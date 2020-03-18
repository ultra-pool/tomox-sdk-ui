//@flow
import type { WebsocketMessage } from '../../../types/websocket'
import { sendMessage } from './common'

export const sendNewLendingOrderMessage = async (order: Object) => {
  if (!window.socket) throw new Error('Socket connection not established')

  const message: WebsocketMessage = {
    channel: 'lending_orders',
    event: {
      type: 'NEW_LENDING_ORDER',
      payload: order,
    },
  }

  return sendMessage(message)
}

export const sendNewOrderCancelMessage = (orderCancelPayload: Object) => {
  if (!window.socket) throw new Error('Socket connection not established')

  const message: WebsocketMessage = {
    channel: 'orders',
    event: {
      type: 'CANCEL_ORDER',
      hash: orderCancelPayload.hash,
      payload: orderCancelPayload,
    },
  }

  return sendMessage(message)
}

export const sendNewSubmitSignatureMessage = (
  hash: string,
  order: Object,
  remainingOrder: Object,
  matches: Array<Object>,
) => {
  const message: WebsocketMessage = {
    channel: 'orders',
    event: {
      type: 'SUBMIT_SIGNATURE',
      hash,
      payload: { order, remainingOrder, matches },
    },
  }

  return sendMessage(message)
}
