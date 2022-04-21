const whitelistOrigin = [
  "http://localhost:3000",
  "http://localhost:9000",
  "http://localhost:3002",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://192.168.10.108:9000",
  "http://192.168.10.108:3000",
  "http://192.168.10.108:5500",
  process.env.FRONTEND_URL as string
]

export default whitelistOrigin