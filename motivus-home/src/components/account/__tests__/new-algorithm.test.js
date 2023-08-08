import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewAlgorthm from '../new-algorithm'
import { Algorithm } from '../../../models'
import { SnackbarProvider } from 'notistack'

jest.mock('../../../models')

describe(`NewAlgorthm`, () => {
  it(`renders new-algorithm`, async () => {
    const create = jest.fn()
    Algorithm.create.mockImplementation(create)

    const algorithm = {
      charge_schema: 'PER_MINUTE',
      cost: 80,
      is_public: true,
      name: 'new-test',
    }

    render(
      <SnackbarProvider>
        <NewAlgorthm />
      </SnackbarProvider>,
    )
    const name = screen.getByRole('textbox', { name: /algorithm name/i })
    userEvent.type(name, 'new-test')
    userEvent.click(screen.getByRole('radio', { name: /public/i }))
    const cost = screen.getByRole('spinbutton', { name: /cost/i })
    userEvent.type(cost, '80')
    userEvent.click(screen.getByRole('button', { name: /charge schema/i }))
    userEvent.click(screen.getByRole('option', { name: /PER MINUTE/i }))
    const permissions = screen.queryByText(/permissions/i)
    expect(permissions).not.toBeInTheDocument()
    const userList = screen.queryByText(/user list/i)
    expect(userList).not.toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /submit algorithm/i }))
    //await screen.findByRole('alert')
    await screen.findByText(/creating algorithm/i)
    expect(create).toHaveBeenCalledWith(algorithm)

    //const title = getByText(/create a new algorithm/i)
    //expect(title).toBeInTheDocument()
  })
})
