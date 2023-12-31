#defmodule MotivusWbApiWeb.Users.UserControllerTest do
#  use MotivusWbApiWeb.ConnCase
#
#  alias MotivusWbApi.Users
#  alias MotivusWbApi.Users.User
#
#  @create_attrs %{
#    avatar: "some avatar",
#    is_guest: true,
#    last_sign_in: "2010-04-17T14:00:00Z",
#    mail: "some mail",
#    name: "some name",
#    provider: "some provider",
#    uuid: "7488a646-e31f-11e4-aace-600308960662"
#  }
#  @update_attrs %{
#    avatar: "some updated avatar",
#    is_guest: false,
#    last_sign_in: "2011-05-18T15:01:01Z",
#    mail: "some updated mail",
#    name: "some updated name",
#    provider: "some updated provider",
#    uuid: "7488a646-e31f-11e4-aace-600308960668"
#  }
#  @invalid_attrs %{avatar: nil, is_guest: nil, last_sign_in: nil, mail: nil, name: nil, provider: nil, uuid: nil}
#
#  def fixture(:user) do
#    {:ok, user} = Users.create_user(@create_attrs)
#    user
#  end
#
#  setup %{conn: conn} do
#    {:ok, conn: put_req_header(conn, "accept", "application/json")}
#  end
#
#  describe "index" do
#    test "lists all users", %{conn: conn} do
#      conn = get(conn, Routes.users_user_path(conn, :index))
#      assert json_response(conn, 200)["data"] == []
#    end
#  end
#
#  describe "create user" do
#    test "renders user when data is valid", %{conn: conn} do
#      conn = post(conn, Routes.users_user_path(conn, :create), user: @create_attrs)
#      assert %{"id" => id} = json_response(conn, 201)["data"]
#
#      conn = get(conn, Routes.users_user_path(conn, :show, id))
#
#      assert %{
#               "id" => id,
#               "avatar" => "some avatar",
#               "is_guest" => true,
#               "last_sign_in" => "2010-04-17T14:00:00Z",
#               "mail" => "some mail",
#               "name" => "some name",
#               "provider" => "some provider",
#               "uuid" => "7488a646-e31f-11e4-aace-600308960662"
#             } = json_response(conn, 200)["data"]
#    end
#
#    test "renders errors when data is invalid", %{conn: conn} do
#      conn = post(conn, Routes.users_user_path(conn, :create), user: @invalid_attrs)
#      assert json_response(conn, 422)["errors"] != %{}
#    end
#  end
#
#  describe "update user" do
#    setup [:create_user]
#
#    test "renders user when data is valid", %{conn: conn, user: %User{id: id} = user} do
#      conn = put(conn, Routes.users_user_path(conn, :update, user), user: @update_attrs)
#      assert %{"id" => ^id} = json_response(conn, 200)["data"]
#
#      conn = get(conn, Routes.users_user_path(conn, :show, id))
#
#      assert %{
#               "id" => id,
#               "avatar" => "some updated avatar",
#               "is_guest" => false,
#               "last_sign_in" => "2011-05-18T15:01:01Z",
#               "mail" => "some updated mail",
#               "name" => "some updated name",
#               "provider" => "some updated provider",
#               "uuid" => "7488a646-e31f-11e4-aace-600308960668"
#             } = json_response(conn, 200)["data"]
#    end
#
#    test "renders errors when data is invalid", %{conn: conn, user: user} do
#      conn = put(conn, Routes.users_user_path(conn, :update, user), user: @invalid_attrs)
#      assert json_response(conn, 422)["errors"] != %{}
#    end
#  end
#
#  describe "delete user" do
#    setup [:create_user]
#
#    test "deletes chosen user", %{conn: conn, user: user} do
#      conn = delete(conn, Routes.users_user_path(conn, :delete, user))
#      assert response(conn, 204)
#
#      assert_error_sent 404, fn ->
#        get(conn, Routes.users_user_path(conn, :show, user))
#      end
#    end
#  end
#
#  defp create_user(_) do
#    user = fixture(:user)
#    %{user: user}
#  end
#end
