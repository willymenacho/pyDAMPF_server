import * as React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { User } from '../../models'
import { SnackbarProvider } from 'notistack'
import UserProfile from './UserProfile'
import UserContext from '../../contexts/User'

jest.mock('../../models')

describe('userName', () => {
  it('change userName', async () => {
    const user = {
      username: 'chuijse',
    }

    const firstUser = {
      avatar_url: 'https://avatars.githubusercontent.com/u/1316798?v=4',
      email: 'cristian.huijse@gmail.com',
      id: 1,
      name: 'Cristian Huijse',
      provider: 'github',
      username: 'Chris',
      uuid: '0ae4d5d0-86f6-4a6a-95bb-e3a931607c44',
    }

    const update = jest
      .fn()
      .mockImplementationOnce(() => {
        throw 'user name exists'
      })
      .mockImplementationOnce(() => ({ ...firstUser, ...user }))
    User.update.mockImplementation(update)

    const setUser = jest.fn().mockImplementationOnce(() => null)

    render(
      <SnackbarProvider>
        <UserContext.Provider value={{ user: firstUser, setUser }}>
          <UserProfile />
        </UserContext.Provider>
      </SnackbarProvider>,
    )

    await screen.findByDisplayValue(/chris/i)

    const name = screen.getByRole('textbox', { name: /nickname/i })

    userEvent.clear(name)
    userEvent.type(name, 'Fmora')

    userEvent.click(screen.getByRole('button', { name: /update profile/i }))
    await screen.findByText(/Could not update user profile/i)

    userEvent.clear(name)
    userEvent.type(name, 'chuijse')

    userEvent.click(screen.getByRole('button', { name: /update profile/i }))

    await screen.findByText(/user profile updated successfully/i)

    expect(update).toHaveBeenCalledWith(user)
    expect(setUser).toHaveBeenCalledWith({ ...firstUser, ...user })
  })
})
