defmodule MotivusWbApi.Users.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :motivus_wb_api,
    error_handler: MotivusWbApi.Users.ErrorHandler,
    module: MotivusWbApi.Users.Guardian

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource, allow_blank: true
  plug MotivusWbApi.Users.Permissions
end
