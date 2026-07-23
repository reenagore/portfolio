module.exports = {
  apps: [
    {
      name: "portfolio-api",
      cwd: "./backend",
      script: "src/server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "512M",
      time: true,
    },
  ],
};
