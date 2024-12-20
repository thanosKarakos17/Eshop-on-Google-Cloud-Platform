const fs = require('fs');
const os = require('os');

// Get the IP dynamically
const { networkInterfaces } = os;
const nets = networkInterfaces();
let vmIp;

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      vmIp = net.address;
      break;
    }
  }
}

console.log(vmIp);
// Update .env dynamically
fs.appendFileSync('.env', `HOST=${vmIp}\nKAFKA_BROKER=${vmIp}:9092\n`);
