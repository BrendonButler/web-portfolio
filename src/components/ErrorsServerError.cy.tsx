import React from 'react'
import { ServerError } from './Errors'

describe('<ServerError />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ServerError />)
  })
})