import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export function getSignalRConnection() {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5094/hubs/location")
      .withAutomaticReconnect()
      .build();
  }

  return connection;
}
