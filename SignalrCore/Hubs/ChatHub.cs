﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalrCore.Hubs
{
    public class ChatHub : Hub
    {
        public void Send( string message)
        {       
            // Call the broadcastMessage method to update clients.
            Clients.All.SendAsync("ReceiveMessage", message + " | " + DateTime.Now);
        }
    }
}