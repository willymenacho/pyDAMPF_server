defmodule MotivusWbApi.AuthControllerCase do
  import Plug.Conn
  alias MotivusWbApi.Fixtures

  def with_auth(%{conn: conn}) do
    user = Fixtures.fixture(:user, %{})

    {:ok, token, _} = Guardian.encode_and_sign(MotivusWbApi.Users.Guardian, user)

    %{
      conn:
        put_req_header(conn, "accept", "application/json")
        |> put_req_header("authorization", "Bearer: " <> token),
      user: user
    }
  end
end
