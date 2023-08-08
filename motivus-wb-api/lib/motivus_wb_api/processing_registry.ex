defmodule MotivusWbApi.ProcessingRegistry do
  use GenServer
  alias MotivusWbApi.TaskPool.Task

  import MotivusWbApi.Metrics.WorkerTaskInstrumenter, only: [update_metric_task: 1]

  def start_link(opts) do
    GenServer.start_link(__MODULE__, %{}, opts)
  end

  def put(pid, channel_id, tid, %Task{} = task) do
    GenServer.cast(pid, {:put, channel_id, tid, task})
  end

  @doc """
  Drops all processing tasks associated to the channel_id supplied
  """
  def drop(pid, channel_id) do
    GenServer.call(pid, {:drop, channel_id})
  end

  @doc """
  Drops a single processing task by channel_id and thread id
  """
  def drop(pid, channel_id, tid) do
    GenServer.call(pid, {:drop, channel_id, tid})
  end

  @doc """
  Drops all processing task that matches key and value
  """
  def drop_by(pid, key, value) do
    GenServer.call(pid, {:drop_by, key, value})
  end

  def list(pid) do
    GenServer.call(pid, :list)
  end

  def empty(pid) do
    GenServer.call(pid, :clear)
  end

  def by_worker_user(pid) do
    GenServer.call(pid, :by_worker_user)
  end

  @spec to_list(map()) :: [map()]
  defp to_list(map),
    do: map |> Enum.map(fn {_node_id, threads} -> threads end) |> Enum.flat_map(fn t -> t end)

  # Callbacks

  @impl true
  def init(map \\ %{}) do
    update_metric_task(map |> to_list)
    {:ok, map}
  end

  @impl true
  def handle_call(action, _from, map) do
    case action do
      :list ->
        flat_map = to_list(map)
        {:reply, flat_map, map}

      :by_worker_user ->
        by_user =
          map
          |> Enum.group_by(fn {channel_id, _v} ->
            [user_uuid | _] = channel_id |> String.split(":")
            user_uuid
          end)

        {:reply, by_user, map}

      {:drop, key} ->
        case Map.has_key?(map, key) do
          true ->
            reply = Map.fetch(map, key)
            map = Map.drop(map, [key])
            update_metric_task(map |> to_list)
            {:reply, reply, map}

          false ->
            {:reply, {:error, "No key"}, map}
        end

      {:drop, channel_id, tid} ->
        tasks = Map.get(map, channel_id) || %{}
        task = Map.fetch(tasks, tid)
        new_tasks = Map.drop(tasks, [tid])

        case Map.has_key?(tasks, tid) do
          true ->
            map = Map.put(map, channel_id, new_tasks)
            update_metric_task(map |> to_list)
            {:reply, task, map}

          false ->
            {:reply, {:error, "No channel_id"}, map}
        end

      {:drop_by, key, value} ->
        partition =
          map
          |> Enum.flat_map(fn {channel_id, tasks} ->
            Enum.map(tasks, fn {tid, task} -> {channel_id, tid, task} end)
          end)
          |> Enum.group_by(fn {_, _, task} -> task |> Map.get(key) == value end)

        new_state =
          Map.get(partition, false, [])
          |> Enum.group_by(fn {cid, _, _} -> cid end)
          |> Enum.reduce(
            %{},
            fn {cid, tasks}, acc ->
              Map.merge(acc, %{
                cid =>
                  Enum.reduce(tasks, %{}, fn {_, tid, task}, acc_tasks ->
                    Map.merge(acc_tasks, %{tid => task})
                  end)
              })
            end
          )

        update_metric_task(new_state |> to_list)

        {:reply, Map.get(partition, true, []), new_state}

      :clear ->
        {:reply, %{}, %{}}
    end
  end

  @impl true
  def handle_cast({:put, node_id, tid, task}, map) do
    tasks = Map.get(map, node_id) || %{}
    new_value = Map.put(tasks, tid, task)

    map = Map.put(map, node_id, new_value)
    update_metric_task(map |> to_list)

    {:noreply, map}
  end
end
