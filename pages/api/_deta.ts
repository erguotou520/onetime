import { Deta } from 'deta'

const deta = Deta('c0u9ryvd_seXpJHELnFWuzxSbxvhnGhS2T1ZoP927')

export const messageDB = deta.Base('message')