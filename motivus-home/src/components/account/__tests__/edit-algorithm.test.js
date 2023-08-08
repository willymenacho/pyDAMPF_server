import * as React from 'react'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EditAlgorthm from '../edit-algorithm'
import { Algorithm, AlgorithmUser } from '../../../models'
import { SnackbarProvider } from 'notistack'

jest.mock('../../../models')

const algorithm = {
  id: 1,
  charge_schema: 'PER_MINUTE',
  cost: 80,
  is_public: true,
  name: 'new-test',
}

const algorithmUpdated = {
  charge_schema: 'PER_EXECUTION',
  cost: 180,
  is_public: false,
  name: 'new-test',
}

const algorithmUsers = [
  {
    algorithm_id: 1,
    charge_schema: null,
    cost: null,
    id: 6,
    role: 'OWNER',
    user: {
      avatar_url: 'https://avatars.githubusercontent.com/u/1316798?v=4',
      email: 'cristian.huijse@gmail.com',
      id: 2,
      name: 'Cristian Huijse',
      provider: 'github',
      username: null,
      uuid: '11b9751b-ff60-49d0-bed5-46aea6f99c2a',
    },
    user_id: 2,
  },
]

const newAlgorithmUser = {
  algorithm_id: 1,
  charge_schema: null,
  cost: null,
  id: 7,
  role: 'OWNER',
  user: {
    avatar_url: 'https://avatars.githubusercontent.com/u/1316798?v=4',
    email: 'fernando@motivus.cl',
    id: 3,
    name: 'Fernando Mora',
    provider: 'github',
    username: 'Fmora',
    uuid: 'ff60-49d0-bed5-11b9751b-46aea6f99c2a',
  },
  user_id: 3,
}

const newAlgorithmUserUpdating = {
  algorithm_id: 1,
  charge_schema: null,
  cost: null,
  id: 7,
  role: 'MAINTAINER',
  user: {
    avatar_url: 'https://avatars.githubusercontent.com/u/1316798?v=4',
    email: 'fernando@motivus.cl',
    id: 3,
    name: 'Fernando Mora',
    provider: 'github',
    username: 'Fmora',
    uuid: 'ff60-49d0-bed5-11b9751b-46aea6f99c2a',
  },
  user_id: 3,
}

const newUserListUser = {
  algorithm_id: 1,
  charge_schema: 'PER_MINUTE',
  cost: 20,
  id: 8,
  role: 'USER',
  user: {
    avatar_url: 'https://avatars.githubusercontent.com/u/1316798?v=4',
    email: 'sebastian@motivus.cl',
    id: 4,
    name: 'Sebastián Etchegaray',
    provider: 'github',
    username: 'setchegaray',
    uuid: 'bed6-ff61-48d1-11b9751b-46aea6f99c2a',
  },
  user_id: 4,
}

jest.setTimeout(25000)
describe('EditAlgorthm', () => {
  it('renders edit-algorithm', async () => {
    const get = jest.fn(() => algorithm)
    Algorithm.get.mockImplementation(get)
    const update = jest.fn()
    Algorithm.update.mockImplementation(update)
    const all = jest
      .fn()
      .mockImplementationOnce(() => algorithmUsers)
      .mockImplementationOnce(() => [...algorithmUsers, newAlgorithmUser])
      .mockImplementationOnce(() => [newAlgorithmUser])
      .mockImplementationOnce(() => [newAlgorithmUserUpdating])
      .mockImplementationOnce(() => [newAlgorithmUserUpdating, newUserListUser])
    AlgorithmUser.all.mockImplementation(all)
    const create = jest
      .fn()
      .mockImplementationOnce(() => {
        throw '404'
      })
      .mockImplementationOnce(() => newAlgorithmUser)
      .mockImplementationOnce(() => newUserListUser)
    AlgorithmUser.create.mockImplementation(create)
    const remove = jest.fn()
    AlgorithmUser.remove.mockImplementation(remove)
    const updateUser = jest.fn()
    AlgorithmUser.update.mockImplementation(updateUser)

    render(
      <SnackbarProvider>
        <EditAlgorthm id={algorithm.id} />
      </SnackbarProvider>,
    )
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
    expect(all).toHaveBeenCalledWith(algorithm.id)

    const name = screen.getByRole('textbox', { name: /algorithm name/i })
    const cost = screen.getByRole('spinbutton', { name: /cost/i })
    const permissions = screen.getByRole('region', { name: /permissions/i })
    const pricingSchema = screen.getByRole('region', {
      name: /pricing\-schema/i,
    })
    const chargeSchema = within(pricingSchema).getByRole('button', {
      name: /charge schema/i,
    })
    const userList = screen.getByRole('region', { name: /user list/i })

    expect(name.value).toBe('new-test')

    userEvent.clear(cost)
    userEvent.type(name, 'new-testa')
    userEvent.type(cost, '180')
    userEvent.click(screen.getByRole('radio', { name: /private/i }))
    userEvent.click(chargeSchema)
    userEvent.click(screen.getByRole('option', { name: /PER EXECUTION/i }))
    userEvent.click(screen.getByRole('button', { name: /update algorithm/i }))
    const permissionUserName = within(permissions).getByRole('textbox', {
      name: /user email/i,
    })
    expect(permissionUserName).toHaveValue('cristian.huijse@gmail.com')
    const permissionRole = within(permissions).getByRole('button', {
      name: /role/i,
    })
    within(permissionRole).getByText(/owner/i)
    const addPermissionButton = within(permissions).getByRole('button', {
      name: '+',
    })

    userEvent.click(addPermissionButton)
    const newPermission = screen.getByRole('region', {
      name: /new\-permission/i,
    })
    const newUserName = within(newPermission).getByRole('textbox', {
      name: /username or email/i,
    })
    userEvent.type(newUserName, 'Fmo')

    //(within(newPermission).getByRole( "option", {name: /role/i} ))
    const newUserRole = within(newPermission).getByRole('button', {
      name: /role/i,
    })
    userEvent.click(newUserRole)
    userEvent.click(screen.getByRole('option', { name: /owner/i }))
    const newPermissionButton = within(permissions).getByRole('button', {
      name: /submit/i,
    })
    userEvent.click(newPermissionButton)
    await screen.findByText(/permission could not be created/i)

    userEvent.clear(newUserName)
    userEvent.type(newUserName, 'Fmora')
    userEvent.click(newPermissionButton)
    await screen.findByText(/creating permission/i)

    expect(create).toHaveBeenCalledWith(algorithm.id, {
      username_or_email: 'Fmora',
      role: 'OWNER',
    })
    await within(permissions).findByDisplayValue('fernando@motivus.cl')

    const [removeCristianButton, _removeFernandoButton] = within(
      permissions,
    ).getAllByRole('button', { name: /delete/i })
    userEvent.click(removeCristianButton)

    // await screen.findByText(/deleting permission/i)
    expect(remove).toHaveBeenCalledWith(algorithm.id, algorithmUsers[0].id)
    await waitFor(() =>
      expect(
        screen.queryByDisplayValue('cristian.huijse@gmail.com'),
      ).toBeNull(),
    )

    //-------------update user------------

    const PermissionsPostUpdating = screen.getByRole('region', {
      name: /permissions/i,
    })
    const permissionUserNameUpdating = within(
      PermissionsPostUpdating,
    ).getByRole('textbox', {
      name: /user email/i,
    })
    expect(permissionUserNameUpdating).toHaveValue('fernando@motivus.cl') //confirmar usuario

    const permissionRoleUpdating = within(PermissionsPostUpdating).getByRole(
      'button',
      {
        name: /role/i,
      },
    )
    userEvent.click(permissionRoleUpdating)
    userEvent.click(screen.getByRole('option', { name: /maintainer/i }))
    const updatePermissionButton = within(PermissionsPostUpdating).getByRole(
      'button',
      {
        name: /update/i,
      },
    )
    userEvent.click(updatePermissionButton)

    expect(updateUser).toHaveBeenCalledWith(
      algorithm.id,
      newAlgorithmUserUpdating.id,
      {
        role: 'MAINTAINER',
        username_or_email: 'fernando@motivus.cl',
        charge_schema: undefined,
        cost: null,
      },
    )

    //--------------User list--------------

    const addPermissionUserButton = within(userList).getByRole('button', {
      name: '+',
    })
    userEvent.click(addPermissionUserButton)

    const newUser = screen.getByRole('region', {
      name: /new\-user/i,
    })
    const userListNewUser = within(newUser).getByRole('textbox', {
      name: /username or email/i,
    })
    const newUserChargeSchema = within(newUser).getByRole('button', {
      name: /charge schema/i,
    })
    const userListNewCost = within(newUser).getByRole('textbox', {
      name: /cost/i,
    })

    userEvent.click(userListNewUser)
    userEvent.type(userListNewUser, 'setchegaray')

    userEvent.click(newUserChargeSchema)
    userEvent.click(screen.getByRole('option', { name: /PER MINUTE/i }))

    userEvent.click(userListNewCost)
    userEvent.type(userListNewCost, '20')

    const userListButtonSubmit = within(userList).getByRole('button', {
      name: /submit/i,
    })

    userEvent.click(userListButtonSubmit)
    // await screen.findByText(/new user added/)

    expect(create).toHaveBeenCalledWith(algorithm.id, {
      username_or_email: 'setchegaray',
      role: 'USER',
      charge_schema: 'PER_MINUTE',
      cost: '20',
    })

    await screen.findByDisplayValue('sebastian@motivus.cl')

    //--------------update button--------------

    const updateAlgorithmButton = screen.getByRole('button', {
      name: /update algorithm/i,
    })
    userEvent.click(updateAlgorithmButton)
    await screen.findByText(/updating algorithm/i)
    expect(update).toHaveBeenCalledWith(algorithm.id, algorithmUpdated)

    //const title = getByText(/create a new algorithm/i)
    //expect(title).toBeInTheDocument()
  })
})
