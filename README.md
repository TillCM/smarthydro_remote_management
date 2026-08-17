# smarthydro_remote_management
Enables the remote management of AI and IoT enabled Hydroponic grow tents 

Every request now requires a `locationId` identifying which tent it's for
(one of: `durban_north`, `namibia`, `sweet_waters`).

Curl command:
curl -X POST https://smarthydro-remote-management.onrender.com/command -H "Content-Type: application/json" -d "{\"command\":\"fan_on\",\"locationId\":\"durban_north\"}"
