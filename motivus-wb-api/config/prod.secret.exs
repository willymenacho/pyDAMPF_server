# In this file, we load production configuration and secrets
# from environment variables. You can also hardcode secrets,
# although such is generally not recommended and you have to
# remember to add this file to your .gitignore.
use Mix.Config

# database_url =
#  System.get_env("DATABASE_URL") ||
#    raise """
#    environment variable DATABASE_URL is missing.
#    For example: ecto://USER:PASS@HOST/DATABASE
#    """

config :motivus_wb_api, MotivusWbApi.Repo,
  # ssl: true,
  username: System.get_env("DB_USER"),
  password: System.get_env("DB_PASSWORD"),
  database: System.get_env("DB_NAME"),
  hostname: System.get_env("DB_HOST"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  port: 5432,
  queue_target: 30000,
  queue_interval: 30000

# queue_interval: 30000,
# ssl: true

# ||
secret_key_base = System.get_env("SECRET_KEY_BASE")
#    raise """
#    environment variable SECRET_KEY_BASE is missing.
#    You can generate one by calling: mix phx.gen.secret
#    """

config :motivus_wb_api, MotivusWbApiWeb.Endpoint,
  http: [
    port: String.to_integer(System.get_env("PORT") || "80"),
    transport_options: [socket_opts: [:inet6]]
  ],
  secret_key_base: secret_key_base

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
#     config :motivus_wb_api, MotivusWbApiWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.
